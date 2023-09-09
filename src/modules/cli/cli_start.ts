import readline from 'readline'

import type { CliInstance, CliInterface } from './types/cli_interface'

/**
 * Wrapper to create a cli interface. Currently uses the readline interface.
 * @param clear - If the console should be cleared on start. Defaults to true.
 * @returns Cli interface instance.
 */
function cli_start(clear: boolean = true): CliInstance {
  if (clear) console.clear()

  const rl = readline.createInterface(process.stdin, process.stdout)

  // an anyonmous class is used in order to have access to private properties.
  return new (class {
    private readonly interface: CliInterface

    constructor(intf: CliInterface) {
      this.interface = intf
    }

    public print(...value: string[]) {
      console.log(...value)
    }
  })(rl)
}

export default cli_start
