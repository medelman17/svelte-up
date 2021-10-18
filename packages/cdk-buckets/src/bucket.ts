import { Construct } from 'constructs'
import { aws_s3 as s3 } from 'aws-cdk-lib'

export interface SupBucketProps extends s3.BucketProps {
  // Define construct properties here
}

export class SupBucket extends Construct {
  private bucket: s3.Bucket
  constructor(scope: Construct, id: string, props: SupBucketProps = {}) {
      super(scope, id)
      
      this.bucket = new s3.Bucket()

    // Define construct contents here
  }
}
