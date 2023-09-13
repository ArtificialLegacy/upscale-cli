import readline from 'readline'

import type { CliInstance, CliInterface } from './types/cli_interface'
import type { CliQuestionOptions } from './types/cli_question_options'

import cli_question from './functions/cli_question'
import cli_menu from './functions/cli_menu'

/**
 * Wrapper to create a cli interface. Currently uses the readline interface.
 * @param clear - If the console should be cleared on start. Defaults to true.
 * @returns Cli interface instance.
 */
function cli_start(clear: boolean = true): CliInstance {
  if (clear) console.clear()

  const intf = readline.createInterface(process.stdin, process.stdout)

  // an anyonmous class is used in order to have access to private properties.
  return new (class {
    private readonly interface: CliInterface

    constructor(intf: CliInterface) {
      this.interface = intf
    }

    public print(...value: string[]) {
      console.log(...value)
    }

    public clear() {
      console.clear()
    }

    public cursor_hide() {
      process.stdout.write('\x1B[?25l')
    }

    public cursor_show() {
      process.stdout.write('\x1B[?25h')
    }

    public cursor_move(pos: number) {
      readline.cursorTo(process.stdout, 0, pos)
    }

    public async question(
      question: string,
      options: CliQuestionOptions = {},
    ): Promise<string> {
      return cli_question(this.interface, question, options)
    }

    public async menu(question: string, options: string[]): Promise<number> {
      return cli_menu(this, question, options)
    }
  })(intf)
}

export default cli_start
