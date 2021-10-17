import { Construct } from 'constructs'
import { SupStack } from '../stacks'
import * as path from 'path'
import * as cdk from 'aws-cdk-lib'
import { aws_iam as iam, aws_lambda as lambda } from 'aws-cdk-lib'

const resourceType = 'Custom::EC2Keypair'

export interface SupStackKeypairProps {
  name: string
}

export interface SupKeypairProps {
  name: string
  secretPrefix: string
  roleName?: string
}

export class SupKeypair extends Construct implements cdk.ITaggable {
  tags: cdk.TagManager = new cdk.TagManager(cdk.TagType.KEY_VALUE, 'SupKeypair')

  private resource: cdk.CustomResource

  constructor(
    scope: Construct,
    id: string,
    private readonly props: SupKeypairProps,
  ) {
    super(scope, id)

    this.tags.setTag('Name', this.props.name)

    const handlerProperties: any = {}

    this.resource = new cdk.CustomResource(this, 'Resource', {
      resourceType,
      serviceToken: this.lambdaFunction.functionArn,
      properties: handlerProperties,
    })
  }

  get keyName(): string {
    return this.resource.getAttString('KeyName')
  }

  get role(): iam.IRole {
    return this.lambdaFunction.role!
  }

  private get lambdaFunction(): lambda.Function {
    const constructName = `${resourceType}Lambda`
    const stack = cdk.Stack.of(this)
    const existing = stack.node.tryFindChild(constructName)
    if (existing) {
      return existing as lambda.Function
    }

    const lambdaPath = ''
    const lambdaDir = ''

    const role = new iam.Role(stack, `${resourceType}Role`, {
      roleName: this.props.roleName,
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    })

    role.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: [
          'cur:*',
          'logs:CreateLogGroup',
          'logs:CreateLogStream',
          'logs:PutLogEvents',
        ],
        resources: ['*'],
      }),
    )

    role.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ['ec2:CreateKeyPair', 'ec2:DeleteKeyPair'],
        resources: ['*'],
      }),
    )

    role.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: [
          'secretsmanager:CreateSecret',
          'secretsmanager:RestoreSecret',
          'secretsmanager:PutSecretValue',
          'secretsmanager:DeleteSecret',
        ],
        resources: ['*'],
      }),
    )

    return new lambda.Function(stack, constructName, {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset(lambdaDir),
      handler: 'index.handler',
      role,
      timeout: cdk.Duration.seconds(10),
    })
  }
}

export class SupStackKeypair extends Construct {
  private readonly resource: SupKeypair

  constructor(scope: Construct, id: string, props: SupStackKeypairProps) {
    super(scope, id)

    const stack = SupStack.of(this)
    const prefix = stack.supPrefix
    this.resource = new SupKeypair(this, 'Resource', {
      name: `${prefix}-${props.name}`,
      secretPrefix: `${prefix}/keypair/`,
    })
  }

  get keyName(): string {
    return this.resource.keyName
  }
}
