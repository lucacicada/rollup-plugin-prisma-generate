import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import colors from 'picocolors'

export default function prismaGenerate(options) {
  const cwd = path.resolve(options?.cwd || process.cwd())
  const logger = options?.logger || console

  let dirty = true

  return {
    name: 'rollup-plugin-prisma-generate',
    watchChange(id, { event }) {
      if (event !== 'delete' && id.endsWith('schema.prisma')) {
        dirty = true
      }
    },
    buildStart: {
      order: 'pre',
      sequential: true,
      handler() {
        this.addWatchFile('prisma/schema.prisma')

        // do not generate again!
        if (!dirty) {
          return
        }

        if (!fs.existsSync('prisma/schema.prisma')) {
          // do not generate if we do not have a schema!
          // wait until the watchChange triggers
          dirty = false
          return
        }

        try {
          // WHY: https://github.com/prisma/prisma/discussions/13877
          // run the program this way ensures the correct execution even tho is slow
          // we also need an explicit schema since we cant use the --watch flag
          execSync('npx prisma generate --schema prisma/schema.prisma', {
            cwd,
            env: {},
            encoding: 'utf8',
            timeout: 10000
          })

          logger.info(`${colors.green('✓')} @prisma/client`)
        } catch (e) {
          logger.warn(`${colors.red('✖')} @prisma/client\n${colors.yellow(e.stderr.trim())}`)
        }

        dirty = false
      }
    }
  }
}
