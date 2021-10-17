import * as cdk from 'aws-cdk-lib'

export function prepareString(
  str: string,
  props: { lowercase?: boolean },
): string {
  if (cdk.Token.isUnresolved(str)) {
    return str
  } else if (props.lowercase) {
    return str.toLowerCase()
  }
  return str
}
