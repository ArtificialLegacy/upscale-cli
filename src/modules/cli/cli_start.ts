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

  // an anyonmous class is used in order to have access to private properties.
  return new CliInstance(intf)
}

export default cli_start
