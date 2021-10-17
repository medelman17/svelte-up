import { trimSpecialCharacters, prepareString, hashPath } from '../utils'
import { SupStack } from '../stacks'
import * as cdk from 'aws-cdk-lib'

export interface CreateStackNameProps {
  suffixLength?: number
  separator?: string
  account?: string
  region?: string
  name?: string
  lowercase?: boolean
}

export function roleName(name: string, suffixLength: number = 8): string {
  return stackName({
    name,
    suffixLength,
  })
}

export function encryptionKeyName(name: string): string {
  return stackName({
    name,
    suffixLength: 8,
  })
}

export function keyPairName(name: string): string {
  return stackName({
    name,
    suffixLength: 8,
  })
}

export function policyName(name: string): string {
  return stackName({
    name,
    suffixLength: 8,
  })
}

export function logGroupName(name: string, suffixLength?: number): string {
  return (
    '/' +
    stackName({
      name,
      separator: '/',
      suffixLength,
    })
  )
}

export function snsTopicName(name: string, suffixLength?: number): string {
  return stackName({
    name: `Notification-${name}`,
    suffixLength: suffixLength || 0,
  })
}

export function stackName<T extends SupStack = SupStack>(
  props: CreateStackNameProps = {},
): string {
  return cdk.Lazy.uncachedString({
    produce: (context: cdk.IResolveContext) => {
      const { scope } = context
      const stack = SupStack.of(scope)
      const prefix = trimSpecialCharacters(stack.supName)
      const bits = [prepareString(prefix, props)]

      if (props.account) bits.push(cdk.Aws.ACCOUNT_ID)
      if (props.region) bits.push(cdk.Aws.REGION)
      if (props.name) bits.push(prepareString(props.name, props))

      if (props.suffixLength && props.suffixLength > 0) {
        const parents = scope.node.scopes
        const path = parents.map((p) => p.node.id)
        const suffix = hashPath(path, props.suffixLength)
        bits.push(prepareString(suffix, props))
      }

      return bits.join(props.separator ?? '-')
    },
  })
}
