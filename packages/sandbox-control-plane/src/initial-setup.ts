import {
  SupStack,
  SupStackProps,
  SupOperatorStackProps,
  SupOperatorStack,
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
  aws_apigatewayv2 as apigateway,
} from 'aws-cdk-lib'

export namespace InitialSetup {
  export interface CommonProps extends SupStackProps {
    svelteUpName: string
    svelteUpPrefix: string
    ssmRoot?: string
  }

  export interface Props extends CommonProps {}
}

export class InitialSetup extends SupStack {
  svelteUpName: string
  svelteUpPrefix: string
  constructor(scope: Construct, id: string, props: InitialSetup.Props) {
    super(scope, id, props)

    this.svelteUpName = props.svelteUpName ?? 'SvelteUp'
    this.svelteUpPrefix = props.svelteUpPrefix ?? 'SUP-'
  }
}
