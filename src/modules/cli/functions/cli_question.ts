import type { CliInterface } from '../types/cli_interface'
import type { CliQuestionOptions } from '../types/cli_question_options'

/**
 * Prompts the user to provide an answer to a prompt.
 * @param intf - The cli interface to print the prompt to.
 * @param question - The prompt to print.
 * @param options - Options for post-processing the user input.
 * @returns - The user's answer, may reject if only certain answers are accepted, but no default is provided.
 */
function cli_question(
  intf: CliInterface,
  question: string,
  options: CliQuestionOptions,
): Promise<string> {
  const promise = new Promise<string>((resolve, reject) => {
    intf.question(question, (answer: string) => {
      if (options?.normalize) answer = answer.toUpperCase()

      if (options.accepts && !options.accepts.includes(answer)) {
        if (options.default) {
          answer = options.default
        } else {
          reject(answer)
        }
      }

      resolve(answer)
    })
  })

  return promise
}

export default cli_question
