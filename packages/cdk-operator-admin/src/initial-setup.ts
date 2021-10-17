import {
  SupConstruct,
  SupConstructProps,
  SupOperatorStack,
  SupOperatorStackProps,
} from '@svelte-up/cdk-core'
import { Construct } from 'constructs'
import * as cdk from 'aws-cdk-lib'

export namespace InitialSetup {
  export interface CommonProps extends SupOperatorStackProps {}

  export interface Props extends CommonProps {}
}

export class InitialSetup extends SupOperatorStack {
  constructor(scope: Construct, id: string, props: InitialSetup.Props) {
    super(scope, id, props)

    new InitialSetup.Pipeline(this, 'Pipeline', props)
  }
}

export namespace InitialSetup {
  export type PipelineProps = CommonProps

  export class Pipeline extends SupConstruct {
    constructor(scope: Construct, id: string, props: PipelineProps) {
      super(scope, id, props)

      const stack = cdk.Stack.of(this)
    }
  }
}
