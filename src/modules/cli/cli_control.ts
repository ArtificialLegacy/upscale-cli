import type { CliQuestionOptions } from './types/cli_question_options'

import cli_question from './functions/cli_question'
import cli_menu from './functions/cli_menu'

class CliControl {
  /**
   * A wrapper to print to the cli interface in use
   * @param value - The value to print.
   */
  public static print(...value: string[]) {
    console.log(...value)
  }

  /**
   * Clears the cli interface in use.
   */
  public static clear() {
    console.clear()
  }

  /**
   * Sends a question to the user using the cli interface.
   * @param question - The question to ask a response to.
   * @returns - The response given by the user.
   */
  public static async question(
    question: string,
    options: CliQuestionOptions = {},
  ): Promise<string> {
    return cli_question(question, options)
  }

  /**
   * Creates a menu for the user to select an option from.
   * @param question - The header question for the user to select an option based on.
   * @param options - The options to select from.
   * @returns - The index of the option selected.
   */
  public static async menu(
    question: string,
    options: string[],
  ): Promise<number> {
    return cli_menu(question, options)
  }
}

export default CliControl
