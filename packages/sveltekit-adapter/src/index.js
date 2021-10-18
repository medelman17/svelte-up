import { writeFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import esbuild from 'esbuild'

/**
 * @typedef {import('esbuild').BuildOptions} BuildOptions
 */

/** @type {import('.')} **/
export default function (options) {
  return {
    name: '@svelte-up/sveltekit-adapter',
    async adapt({ utils }) {
      const dir = '.svelte-up_build_output'
      utils.rimraf(dir)

      const files = fileURLToPath(new URL('./files', import.meta.url))

      const dirs = {
        static: join(dir, 'static'),
        lambda: join(dir, 'functions/node/render'),
      }

      utils.log.minor('Generating serverless function...')
      utils.copy(join(files, 'entry.js'), '.svelte-kit/svelteup/entry.js')

      /** @type {BuildOptions} */
      const default_options = {
        entryPoints: ['.svelte-kit/svelteup/entry.js'],
        outfile: join(dirs.lambda, 'index.js'),
        bundle: true,
        inject: [join(files, 'shims.js')],
        platform: 'node',
      }

      const build_options =
        options && options.esbuild
          ? await options.esbuild(default_options)
          : default_options

      await esbuild.build(build_options)

      writeFileSync(
        join(dirs.lambda, 'package.json'),
        JSON.stringify({ type: 'commonjs' }),
      )

      utils.log.minor('Prerendering static pages...')
      await utils.prerender({
        dest: dirs.static,
      })

      utils.log.minor('Copying assets...')
      utils.copy_static_files(dirs.static)
      utils.copy_client_files(dirs.static)

      utils.log.minor('Writing routes...')
      utils.copy(join(files, 'routes.json'), join(dir, 'config/routes.json'))
    },
  }
}
