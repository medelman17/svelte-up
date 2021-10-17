import { Construct } from 'constructs'
import * as cfn_inc from '@aws-cdk/cloudformation-include'

export namespace CfnInclude {
  export interface Props {
    path: string
  }
}

export class CfnInclude extends Construct {
  constructor(scope: Construct, id: string, props: CfnInclude.Props) {
    super(scope, id)

    new cfn_inc.CfnInclude(this as any, 'include', {
      templateFile: props.path,
    })
  }
}
