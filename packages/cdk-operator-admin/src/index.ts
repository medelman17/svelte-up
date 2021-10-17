import * as path from 'path'
import * as cdk from 'aws-cdk-lib'
import { InitialSetup } from './initial-setup'

process.on('unhandledRejection', (reason, _) => {
  console.error(reason)
  process.exit(1)
})

async function main() {
  const app = new cdk.App()

  const operatorName = process.env.OPERATOR_NAME ?? 'SvelteUpAdmin'
  const operatorPrefix = process.env.OPERATOR_PREFIX ?? 'SupAdminOp-'
  const stateMachineName = ''
  const stateMachineExecutionRole = ''

  new InitialSetup(app, `${operatorPrefix}InitialSetup`, {
    supName: operatorName,
    supPrefix: operatorPrefix,
  })
}

main()
