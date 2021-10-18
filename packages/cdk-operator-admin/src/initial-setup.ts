import {
  SupConstruct,
  SupConstructProps,
  SupOperatorStack,
  SupOperatorStackProps,
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
} from 'aws-cdk-lib'

export namespace InitialSetup {
  export interface CommonProps extends SupOperatorStackProps {}

  export interface Props extends CommonProps {}
}

export class InitialSetup extends SupOperatorStack {
  constructor(scope: Construct, id: string, props: InitialSetup.Props) {
    super(scope, id, props)

    new InitialSetup.Pipeline(this, 'Pipeline', props)
  }
}

export namespace InitialSetup {
  export type PipelineProps = CommonProps

  export class Pipeline extends SupConstruct {
    constructor(scope: Construct, id: string, props: PipelineProps) {
      super(scope, id, props)

      const stack = cdk.Stack.of(this)

      const buildTimeout = cdk.Duration.hours(4)

      const pipelineRole = new iam.Role(this, 'Role', {
        roleName: generator.names.roleName('Admin-Pipeline-MasterRole'),
        assumedBy: new iam.CompositePrincipal(
          new iam.ServicePrincipal('codebuild.amazonaws.com'),
          new iam.ServicePrincipal('lambda.amazonaws.com'),
          new iam.ServicePrincipal('events.amazonaws.com'),
        ),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
        ],
        maxSessionDuration: buildTimeout,
      })
    }
  }
}
