import inquirer from 'inquirer'

import type { CliQuestionOptions } from '../types/cli_question_options'

/**
 * Prompts the user to provide an answer to a prompt.
 * @param question - The prompt to print.
 * @param options - Options for post-processing the user input.
 * @returns - The user's answer, may reject if only certain answers are accepted, but no default is provided.
 */
async function cli_question(
  question: string,
  options: CliQuestionOptions,
): Promise<string> {
  const answer = await inquirer.prompt({
    type: 'input',
    name: 'answer',
    message: question,
  })

  answer.answer = answer.answer.trim()

  if (options.normalize) answer.answer = answer.answer.toUpperCase()

  if (options.accepts && !options.accepts.includes(answer.answer)) {
    if (options.default) {
      return options.default
    } else {
      throw new Error('No default provided, and answer not accepted.')
    }
  }

  return answer.answer
}

export default cli_question
