import * as cdk from 'aws-cdk-lib'
import { SupBucketSecure } from '../src/index'

test('Empty Stack', () => {
  const app = new cdk.App()
  const stack = new cdk.Stack(app, 'TestStack')
  // WHEN
  new SupBucketSecure(stack, 'MyTestConstruct')
  // THEN
  const actual = app.synth().getStackArtifact(stack.artifactId).template
  expect(actual.Resources ?? {}).toEqual({})
})
