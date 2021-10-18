import {
  SupConstruct,
  SupConstructProps,
  SupOperatorStack,
  SupOperatorStackProps,
  SupStackParameter,
  SupStackParameterProps,
  generator,
} from '@svelte-up/cdk-core'
import { Construct } from 'constructs'
import * as cdk from 'aws-cdk-lib'
import {
  aws_iam as iam,
  aws_s3 as s3,
  aws_dynamodb as dynamodb,
  aws_lambda as lambda,
  aws_s3_assets as assets,
  aws_secretsmanager as secrets,
  aws_stepfunctions as sfn,
  aws_ssm as ssm,
  aws_codepipeline as codepipeline,
  aws_codepipeline_actions as actions,
  aws_codebuild as codebuild,
} from 'aws-cdk-lib'

export namespace InitialSetup {
  export interface CommonProps extends SupOperatorStackProps {
    svelteUpName: string
    svelteUpPrefix: string
    ssmRoot?: string
  }

  export interface Props extends CommonProps {}
}

export class InitialSetup extends SupOperatorStack {
  svelteUpName: string
  svelteUpPrefix: string
  ssmRoot: string
  constructor(scope: Construct, id: string, props: InitialSetup.Props) {
    super(scope, id, props)

    this.svelteUpName = props.svelteUpName ?? 'SvelteUp'
    this.svelteUpPrefix = props.svelteUpPrefix ?? 'SUP-'
    this.ssmRoot = props.ssmRoot ?? 'SvelteUp'

    const svelteUpNameParam = new SupStackParameter(this, 'SvelteUpName', {
      stringValue: this.svelteUpName,
      parameterName: 'SvelteUpName',
      description: 'SvelteUp name used for deployment.',
      allowedPattern: '[a-zA-Z][a-zA-Z0-9]{0,3}',
    })

    const svelteUpNamePrefix = new SupStackParameter(this, 'SvelteUpPrefix', {
      stringValue: this.svelteUpPrefix,
      parameterName: 'SvelteUpPrefix',
      description: 'SvelteUp prefix used for deployment.',
      allowedPattern: '[a-zA-Z][a-zA-Z0-9-]{0,8}-',
    })

    const stateMachineName = `${this.svelteUpPrefix}MainStateMachine_sm`

    // The state machine name has to match the name of the state machine in initial setup
    const stateMachineArn = `arn:aws:states:${this.region}:${this.account}:stateMachine:${stateMachineName}`

    const installerProjectRole = new iam.Role(this, 'InstallerProjectRole', {
      roleName: `${this.svelteUpPrefix}CB-Installer`,
      assumedBy: new iam.ServicePrincipal('codebuild.amazonaws.com'),
    })

    installerProjectRole.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ['ecr:*'],
        resources: [
          `arn:aws:ecr:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:repository/aws-cdk/*`,
        ],
      }),
    )

    // Allow getting authorization tokens for ECR
    installerProjectRole.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ['ecr:GetAuthorizationToken'],
        resources: [`*`],
      }),
    )

    installerProjectRole.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ['sts:AssumeRole'],
        resources: [`arn:aws:iam::${cdk.Aws.ACCOUNT_ID}:role/cdk-*`],
      }),
    )

    // Allow all CloudFormation permissions
    installerProjectRole.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ['cloudformation:*'],
        resources: [
          `arn:aws:cloudformation:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:stack/*`,
        ],
      }),
    )

    // Allow the role to access the CDK asset bucket
    installerProjectRole.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ['s3:*'],
        resources: [`arn:aws:s3:::cdk-*`],
      }),
    )

    // Allow the role to create anything through CloudFormation
    installerProjectRole.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ['*'],
        resources: ['*'],
        conditions: {
          'ForAnyValue:StringEquals': {
            'aws:CalledVia': ['cloudformation.amazonaws.com'],
          },
        },
      }),
    )

    const sourceArtifact = new codepipeline.Artifact()

    const installerProject = new codebuild.PipelineProject(
      this,
      'InstallerProject',
      {
        projectName: `${this.svelteUpPrefix}InstallerProject_pl`,
        role: installerProjectRole,
        buildSpec: codebuild.BuildSpec.fromObject({
          version: '0.2',
          phases: {
            install: {
              'runtime-version': {
                nodejs: 14,
              },
              commands: [
                'npm install --global pnpm@5.18.9',
                'pnpm install --unsafe-perm --frozen-lockfile',
              ],
            },
            build: {
              commands: [],
            },
          },
        }),
        environment: {
          buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
          privileged: true,
          environmentVariables: {},
        },
      },
    )
  }
}
