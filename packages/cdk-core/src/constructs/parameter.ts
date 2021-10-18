import { Construct } from 'constructs'
import { SupStack } from '../stacks'
import * as cdk from 'aws-cdk-lib'
import { aws_ssm as ssm } from 'aws-cdk-lib'

export interface SupStackParameterProps extends ssm.StringParameterProps {
  parameterName: string
  ssmRoot?: string
}

export class SupStackParameter extends Construct {
  private readonly resource: ssm.StringParameter
  private readonly ssmRoot: string

  constructor(scope: Construct, id: string, props: SupStackParameterProps) {
    super(scope, id)

    const stack = SupStack.of(this)
    const prefix = stack.svelteUpPrefix
    this.ssmRoot = props.ssmRoot ?? prefix

    this.resource = new ssm.StringParameter(this, 'StringParam', {
      ...props,
      parameterName: `/${this.ssmRoot}/${props.parameterName}`,
    })
  }

  grantRead(grantable: cdk.aws_iam.IGrantable) {
    return this.resource.grantRead(grantable)
  }

  grantWrite(grantable: cdk.aws_iam.IGrantable) {
    return this.resource.grantWrite(grantable)
  }

  get parameterName(): string {
    return this.resource.parameterName
  }

  get parameterValue(): String {
    return this.resource.stringValue
  }
}
