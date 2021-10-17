#!/usr/bin/env node

import { Command } from 'commander'
import { welcome } from './welcome'
const program = new Command()

program.version('0.1.0')

async function run() {
  await welcome()
}

async function main() {
  program.action(run)
  await program.parseAsync(process.argv)
}

main().catch((e) => {
  console.log(e)
  process.exit(1)
})
