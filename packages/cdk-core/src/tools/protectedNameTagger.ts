import * as cdk from 'aws-cdk-lib'
import { IConstruct, Construct } from 'constructs'
// import {
//   aws_kms as kms,
//   aws_s3 as s3,
//   aws_cloudfront as cloudfront,
//   aws_route53 as route53,
//   aws_certificatemanager as cert_manager,
// } from 'aws-cdk-lib'
import { Type, Action } from '../types'

const NAME_TAG = 'SvelteUp-P'

function addSupStackProtectedTag<T extends Construct>(
  type: Type<T>,
  operatorName: string,
  tagPriority: number = 100,
): Action {
  return (value: IConstruct) => {
    if (value instanceof type) {
      if (cdk.TagManager.isTaggable(value)) {
        value.tags.setTag(NAME_TAG, operatorName, tagPriority)
      } else if (cdk.TagManager.isTaggable(value.node.defaultChild)) {
        value.node.defaultChild.tags.setTag(NAME_TAG, operatorName, tagPriority)
      }
      return true
    }
    return false
  }
}

export class SupStackProtectedNameTagger implements cdk.IAspect {
  readonly actions: Action[]
  readonly supName: string

  constructor(supName: string) {
    this.supName = supName
    this.actions = []
  }

  visit(node: IConstruct): void {
    for (const action of this.actions) {
      if (action(node)) {
        break
      }
    }
  }
}
