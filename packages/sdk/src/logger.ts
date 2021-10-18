import chalk from 'chalk'

export const tags = {
  error: chalk.red('svelte-up:error'),
  warn: chalk.yellow('svelte-up:warn'),
  info: chalk.cyan('svelte-up:info'),
  query: chalk.blue('svelte-up:query'),
}
export const should = {
  warn: !process.env.SVELTE_UP_DISABLE_WARNINGS,
}
export function log(...data: any[]) {
  console.log(...data)
}
export function warn(message: any, ...optionalParams: any[]) {
  if (should.warn) {
    console.warn(`${tags.warn} ${message}`, ...optionalParams)
  }
}
export function info(message: any, ...optionalParams: any[]) {
  console.info(`${tags.info} ${message}`, ...optionalParams)
}
export function error(message: any, ...optionalParams: any[]) {
  console.error(`${tags.error} ${message}`, ...optionalParams)
}
export function query(message: any, ...optionalParams: any[]) {
  console.log(`${tags.query} ${message}`, ...optionalParams)
}
