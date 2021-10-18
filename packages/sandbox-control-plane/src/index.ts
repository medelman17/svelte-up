import * as cdk from 'aws-cdk-lib'
import { InitialSetup } from './initial-setup'

async function build() {
  const app = new cdk.App()

  new InitialSetup(app, 'ControlPlane', {
    svelteUpName: 'ControlPlane',
    svelteUpPrefix: 'SupCtrl-',
    env: {
      region: 'us-east-1',
      account: '557432423607',
    },
  })
}

build().catch((e) => {
  console.error(e)
  process.exit(1)
})
