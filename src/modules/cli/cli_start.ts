import readline from 'readline'

import type { CliInterface } from './types/cli_interface'

/**
 * Wrapper to create a cli interface. Currently uses the readline interface.
 * @param clear - If the console should be cleared on start. Defaults to true.
 * @returns Cli interface instance.
 */
function cli_start(clear: boolean = true): CliInterface {
  const rl = readline.createInterface(process.stdin, process.stdout)
  if (clear) console.clear()
  return rl
}

export default cli_start
