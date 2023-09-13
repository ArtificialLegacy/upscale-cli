import type readline from 'readline'
import type { CliQuestionOptions } from './cli_question_options'

// The type structure for the interface wrapper class
type CliInstance = {
  /**
   * A wrapper to print to the cli interface in use
   * @param value - The value to print.
   */
  print: (...value: any[]) => void

  /**
   * Clears the cli interface in use.
   */
  clear: () => void

  /**
   * Shows the cursor in the cli interface in use.
   */
  cursor_show: () => void

  /**
   * Hides the cursor in the cli interface in use.
   */
  cursor_hide: () => void

  /**
   * Moves the cursor in the cli interface in use.
   * @param pos - The y position to move the cursor to.
   */
  cursor_move: (pos: number) => void

  /**
   * Sends a question to the user using the cli interface.
   * @param question - The question to ask a response to.
   * @returns - The response given by the user.
   */
  question: (question: string, options?: CliQuestionOptions) => Promise<string>

  /**
   * Creates a menu for the user to select an option from.
   * @param question - The header question for the user to select an option based on.
   * @param options - The options to select from.
   * @returns - The index of the option selected.
   */
  menu: (question: string, options: string[]) => Promise<number>
}

// The type of the cli interface library used.
type CliInterface = readline.Interface

export type { CliInstance, CliInterface }
