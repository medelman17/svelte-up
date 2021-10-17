import { Construct } from 'constructs'
import { SupStack, SupStackProps } from './base'

export interface SupOperatorStackProps extends SupStackProps {}

export class SupOperatorStack extends SupStack {
  constructor(scope: Construct, id: string, props: SupOperatorStackProps) {
    super(scope, id, props)
  }
}
