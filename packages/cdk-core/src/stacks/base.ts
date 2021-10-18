import * as cdk from 'aws-cdk-lib'
import { IConstruct, Construct } from 'constructs'
import { SupStackNameTagger, SupStackProtectedNameTagger } from '../tools'

export interface SupStackProps extends cdk.StackProps {
  svelteUpName: string
  svelteUpPrefix: string
}

export class SupStack extends cdk.Stack {
  readonly svelteUpName: string
  readonly svelteUpPrefix: string

  constructor(scope: Construct, id: string, props: SupStackProps) {
    super(scope, id, props)

    const { svelteUpName, svelteUpPrefix } = props

    this.svelteUpName = svelteUpName
    this.svelteUpPrefix = svelteUpPrefix

    this.tags.setTag('SvelteUpStackName', this.svelteUpName)
    cdk.Aspects.of(this).add(new cdk.Tag('SvelteUpStack', this.svelteUpName))
    cdk.Aspects.of(this).add(new SupStackNameTagger())
    cdk.Aspects.of(this).add(new SupStackProtectedNameTagger(this.svelteUpName))
  }

  static of(construct: IConstruct): SupStack {
    const parents = construct.node.scopes
    const stack = parents.find(
      (p: IConstruct): p is SupStack => p instanceof SupStack,
    )

    if (!stack) {
      throw new Error(`The construct should only be used inside an SupStack`)
    }
    return stack
  }
}
