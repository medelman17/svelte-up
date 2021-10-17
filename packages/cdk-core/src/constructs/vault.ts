import * as cdk from 'aws-cdk-lib'
import {
  aws_iam as iam,
  aws_kms as kms,
  aws_secretsmanager as secrets,
} from 'aws-cdk-lib'
import { Construct } from 'constructs'

export interface SecretVaultProps
  extends Omit<secrets.SecretProps, 'encryptionKey'> {
  secretName: string
  secretAlias: string
  actions?: string[]
  principals: iam.IPrincipal[]
}

export class SecretVault extends Construct {
  readonly encryptionKey: kms.Key
  readonly keyAlias: string
  readonly principals: iam.IPrincipal[] = []

  constructor(scope: Construct, name: string, props: SecretVaultProps) {
    super(scope, name)

    this.keyAlias = props.secretAlias
    this.encryptionKey = new kms.Key(this, `EncryptionKey`, {
      alias: `alias/${this.keyAlias}`,
      description: `Key used to encrypt/decrypt secrets`,
      enableKeyRotation: true,
    })

    this.encryptionKey.addToResourcePolicy(
      new iam.PolicyStatement({
        sid: 'Allow access through AWS Secrets Manager for all principals in the account that are authorized to use AWS Secrets Manager',
        effect: iam.Effect.ALLOW,
        actions: [
          'kms:Encrypt',
          'kms:Decrypt',
          'kms:ReEncrypt*',
          'kms:GenerateDataKey*',
          'kms:CreateGrant',
          'kms:DescribeKey',
        ],
        principals: [new iam.AnyPrincipal()],
        resources: ['*'],
        conditions: {
          StringEquals: {
            'kms:ViaService': `secretsmanager.${cdk.Aws.REGION}.amazonaws.com`,
            'kms:CallerAccount': cdk.Aws.ACCOUNT_ID,
          },
        },
      }),
    )
  }

  createSecret(id: string, props: SecretVaultProps) {
    const secret = new secrets.Secret(this, id, {
      ...props,
      encryptionKey: this.encryptionKey,
    })
    secret.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: props.actions ?? ['secretsmanager:GetSecretValue'],
        resources: ['*'],
        principals: props.principals,
      }),
    )

    this.principals.push(...props.principals)
    return secret
  }

  get alias() {
    return this.keyAlias
  }

  protected onPrepare(): void {
    this.encryptionKey.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ['kms:Decrypt'],
        resources: ['*'],
        principals: this.principals,
      }),
    )
  }
}
