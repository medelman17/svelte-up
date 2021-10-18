import * as cdk from 'aws-cdk-lib'
import { IConstruct, Construct } from 'constructs'
import { aws_lambda as lambda } from 'aws-cdk-lib'

export interface RustLambdaFunctionProps extends lambda.FunctionProps {
  lambdaCode: lambda.Code
}

export class RustLambdaFunction extends Construct {
  private readonly resource: lambda.Function
  constructor(scope: Construct, id: string, props: RustLambdaFunctionProps) {
    super(scope, id)
    this.resource = new lambda.Function(this, 'RustLambdaFunction', {
      ...props,
      description: props.description,
      code: props.lambdaCode,
      runtime: lambda.Runtime.PROVIDED_AL2,
      handler: 'not.required',
      environment: {
        ...props.environment,
        RUST_BACKTRACE: '1',
      },
    })
  }

  get function() {
    return this.resource
  }
}
