import * as cdk from 'aws-cdk-lib'
import { IConstruct, Construct } from 'constructs'
import {
  aws_kms as kms,
  aws_s3 as s3,
  aws_cloudfront as cloudfront,
  aws_route53 as route53,
  aws_certificatemanager as cert_manager,
} from 'aws-cdk-lib'
import { Type, Action } from '../types'

const NAME_TAG = 'SvelteUp'

function addNameTagAsIdWithSuffix<T extends Construct>(
  type: Type<T>,
  suffix: string,
  tagPriority: number = 100,
): Action {
  return (val: IConstruct) => {
    if (val instanceof type) {
      const id = val.node.id
      const name = id.endsWith(suffix) ? id : `${id}${suffix}`

      if (cdk.TagManager.isTaggable(val)) {
        val.tags.setTag(NAME_TAG, name, tagPriority)
      } else if (cdk.TagManager.isTaggable(val.node.defaultChild)) {
        val.node.defaultChild.tags.setTag(NAME_TAG, name, tagPriority)
      }
      return true
    }
    return false
  }
}

export class SupStackNameTagger implements cdk.IAspect {
  static readonly ACTIONS: Action[] = [
    addNameTagAsIdWithSuffix(kms.Key, '_key', 200),
    addNameTagAsIdWithSuffix(kms.CfnKey, '_key', 100),
    addNameTagAsIdWithSuffix(s3.Bucket, '_bucket', 200),
    addNameTagAsIdWithSuffix(s3.CfnBucket, '_bucket', 100),
    addNameTagAsIdWithSuffix(cloudfront.Distribution, '_distribution', 200),
    addNameTagAsIdWithSuffix(cloudfront.CfnDistribution, '_distribution', 100),
    addNameTagAsIdWithSuffix(cert_manager.Certificate, '_cert', 100),
    addNameTagAsIdWithSuffix(cert_manager.CfnCertificate, '_cert', 200),
    addNameTagAsIdWithSuffix(route53.HostedZone, '_hz', 100),
    addNameTagAsIdWithSuffix(route53.CfnHostedZone, '_hz', 200),
  ]

  visit(node: IConstruct): void {
    for (const action of SupStackNameTagger.ACTIONS) {
      if (action(node)) {
        break
      }
    }
  }
}
