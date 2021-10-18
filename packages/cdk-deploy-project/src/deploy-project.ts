import { SupConstruct, SupConstructProps } from '@svelte-up/cdk-core'
import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {
  aws_iam as iam,
  aws_s3 as s3,
  aws_dynamodb as dynamodb,
  aws_lambda as lambda,
  aws_s3_assets as assets,
  aws_secretsmanager as secrets,
  aws_stepfunctions as sfn,
  aws_codebuild as codebuild,
} from 'aws-cdk-lib'

export interface DeployProjectProps extends SupConstructProps {}

export class DeployProject extends SupConstruct {
  constructor(scope: Construct, id: string, props: DeployProjectProps) {
    super(scope, id, props)
  }
}
