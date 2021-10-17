import chalk from 'chalk'
import figlet from 'figlet'
import { banner } from './banner'

import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  colors,
} from 'unique-names-generator'

function name() {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: ' ',
    style: 'capital',
  })
}

export async function welcome() {
  const art = await new Promise<string>((res, rej) => {
    figlet.text(
      banner,
      {
        font: 'colossal',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: false,
      },
      (err, data) => {
        if (err) rej(err)
        res(data)
      },
    )
  })

  const user = withBold(name())

  process.stdout.write(`
  
${chalk.rgb(255, 105, 180).bold(art)}
Welcome to ${withBold(
    'SvelteUp',
  )} v(0.1.0) -- the easiest way to deploy Svelte apps to the cloud!

Your secret codename is ${user} 🤫

👉 https://get.svelteup.today 

`)
}

export function withHotPinkBackground(msg: string) {
  return chalk.white.bgRgb(255, 105, 180).bold(msg)
}

export function withBold(msg: string) {
  return chalk.bold(msg)
}

export function withWhitespace(msg: string) {
  return `\n${msg}\n`
}
