import * as cdk from 'aws-cdk-lib'
import * as CdkBucketSecure from '../lib/index'

test('Empty Stack', () => {
  const app = new cdk.App()
  const stack = new cdk.Stack(app, 'TestStack')
  // WHEN
  new CdkBucketSecure.CdkWebsiteStatic(stack, 'MyTestConstruct')
  // THEN
  const actual = app.synth().getStackArtifact(stack.artifactId).template
  expect(actual.Resources ?? {}).toEqual({})
})
