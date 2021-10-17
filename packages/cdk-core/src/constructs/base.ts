import * as cdk from 'aws-cdk-lib'
import { IConstruct, Construct } from 'constructs'

export interface SupConstructProps {
  supName: string
  supPrefix: string
}

export class SupConstruct extends Construct {
  readonly supName: string
  readonly supPrefix: string

  constructor(scope: Construct, id: string, props: SupConstructProps) {
    super(scope, id)

    const { supName, supPrefix } = props

    this.supName = supName
    this.supPrefix = supPrefix

    cdk.Aspects.of(this).add(new cdk.Tag('SupConstruct', this.supName))
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
