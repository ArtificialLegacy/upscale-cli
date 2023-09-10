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
   * Sends a question to the user using the cli interface.
   * @param question - The question to ask a response to.
   * @returns - The response given by the user.
   */
  question: (question: string, options?: CliQuestionOptions) => Promise<string>
}

// The type of the cli interface library used.
type CliInterface = readline.Interface

export type { CliInstance, CliInterface }
