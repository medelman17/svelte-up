const prefixZero = (value: number): string => ('0' + value).slice(-2)

export function now(): string {
  const now = new Date()
  return `${now.getFullYear()}${prefixZero(now.getMonth() + 1)}${prefixZero(
    now.getDate(),
  )}${prefixZero(now.getHours())}${prefixZero(now.getMinutes())}${prefixZero(
    now.getSeconds(),
  )}`
}
