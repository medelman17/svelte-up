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
} from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { InitialSetup } from './initial-setup'

process.on('unhandledRejection', (reason, _) => {
  console.error(reason)
  process.exit(1)
})

async function main() {
  const app = new cdk.App()

  const svelteUpName = 'Sup'
  const svelteUpPrefix = 'Sup-'
  const ssmRoot = 'Sup'

  new InitialSetup(app, 'InstallerStack', {
    svelteUpName,
    svelteUpPrefix,
    ssmRoot,
  })
}

main()
