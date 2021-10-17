import * as cdk from 'aws-cdk-lib'
import { IConstruct, Construct } from 'constructs'
import { SupStackNameTagger, SupStackProtectedNameTagger } from '../tools'

export interface SupStackProps extends cdk.StackProps {
  supName: string
  supPrefix: string
}

export class SupStack extends cdk.Stack {
  readonly supName: string
  readonly supPrefix: string

  constructor(scope: Construct, id: string, props: SupStackProps) {
    super(scope, id, props)

    const { supName, supPrefix } = props

    this.supName = supName
    this.supPrefix = supPrefix

    this.tags.setTag('SupStackName', this.supName)
    cdk.Aspects.of(this).add(new cdk.Tag('SupStack', this.supName))
    cdk.Aspects.of(this).add(new SupStackNameTagger())
    cdk.Aspects.of(this).add(new SupStackProtectedNameTagger(this.supName))
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
