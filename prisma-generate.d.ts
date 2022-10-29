import type { Plugin } from 'rollup'

export interface Logger {
  info(msg: string): void
  warn(msg: string): void
  error(msg: string): void
}

/**
 * The plugin options.
 */
export interface PrismaGeneratePluginOptions {
  /**
   * A logger.
   *
   * @default console
   */
  logger?: Logger

  /**
   * Directory from which execute the prisma cli.
   *
   * @default process.cwd()
   */
  cwd?: string
}

/**
 * Creates a rollup plugin that calls `npx prisma generate` automatically.
 *
 * @param options The plugin options.
 *
 * ## Example
 *
 * ```ts
 *  plugins: [prismaGenerate()]
 * ```
 */
export default function prismaGenerate(options?: PrismaGeneratePluginOptions): Plugin
