import * as crypto from 'crypto'

/**
 * Based on `makeUniqueId`
 *
 * https://github.com/aws/aws-cdk/blob/f8df4e04f6f9631f963353903e020cfa8377e8bc/packages/%40aws-cdk/core/lib/private/uniqueid.ts#L33
 */
export function hashPath(path: string[], length: number) {
  const hash = crypto.createHash('md5').update(path.join('/')).digest('hex')
  return hash.slice(0, length).toUpperCase()
}
