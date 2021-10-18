import * as cdk from 'aws-cdk-lib'
import { IConstruct, Construct } from 'constructs'

export interface SupConstructProps {
  readonly svelteUpName: string
  readonly svelteUpPrefix: string
}

export class SupConstruct extends Construct {
  readonly svelteUpName: string
  readonly svelteUpPrefix: string

  constructor(scope: Construct, id: string, props: SupConstructProps) {
    super(scope, id)

    const { svelteUpName, svelteUpPrefix } = props

    this.svelteUpName = svelteUpName
    this.svelteUpPrefix = svelteUpPrefix

    cdk.Aspects.of(this).add(
      new cdk.Tag('SvelteUpConstruct', this.svelteUpName),
    )
  }

  static of(construct: IConstruct): SupConstruct {
    const parents = construct.node.scopes
    const stack = parents.find(
      (p: IConstruct): p is SupConstruct => p instanceof SupConstruct,
    )

    if (!stack) {
      throw new Error(`The construct should only be used inside an SupStack`)
    }
    return stack
  }
}
