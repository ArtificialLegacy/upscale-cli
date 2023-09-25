import readline from 'readline'

import CliInstance from './cli_instance'

/**
 * Wrapper to create a cli interface. Currently uses the readline interface.
 * @param clear - If the console should be cleared on start. Defaults to true.
 * @returns Cli interface instance.
 */
function cli_start(clear: boolean = true): CliInstance {
  if (clear) console.clear()

  const intf = readline.createInterface(process.stdin, process.stdout)

  return new CliInstance(intf)
}

export default cli_start
