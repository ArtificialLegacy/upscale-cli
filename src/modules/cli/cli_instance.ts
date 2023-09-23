import readline from 'readline'

import type { CliInterface } from './types/cli_interface'
import type { CliQuestionOptions } from './types/cli_question_options'

import cli_question from './functions/cli_question'
import cli_menu from './functions/cli_menu'

class CliInstance {
  private readonly interface: CliInterface

  constructor(intf: CliInterface) {
    this.interface = intf
  }

  /**
   * A wrapper to print to the cli interface in use
   * @param value - The value to print.
   */
  public print(...value: string[]) {
    console.log(...value)
  }

  /**
   * Clears the cli interface in use.
   */
  public clear() {
    console.clear()
  }

  /**
   * Shows the cursor in the cli interface in use.
   */
  public cursor_show() {
    process.stdout.write('\x1B[?25h')
  }

  /**
   * Hides the cursor in the cli interface in use.
   */
  public cursor_hide() {
    process.stdout.write('\x1B[?25l')
  }

  /**
   * Moves the cursor in the cli interface in use.
   * @param pos - The y position to move the cursor to.
   */
  public cursor_move(pos: number) {
    readline.cursorTo(process.stdout, 0, pos)
  }

  /**
   * Sends a question to the user using the cli interface.
   * @param question - The question to ask a response to.
   * @returns - The response given by the user.
   */
  public async question(
    question: string,
    options: CliQuestionOptions = {},
  ): Promise<string> {
    return cli_question(this.interface, question, options)
  }

  /**
   * Creates a menu for the user to select an option from.
   * @param question - The header question for the user to select an option based on.
   * @param options - The options to select from.
   * @returns - The index of the option selected.
   */
  public async menu(question: string, options: string[]): Promise<number> {
    return cli_menu(this, question, options)
  }
}

export default CliInstance
