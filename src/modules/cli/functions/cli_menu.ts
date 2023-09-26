import inquirer from 'inquirer'

/**
 * Creates a menu for the user to select an option from.
 * @param question - The header question for the user to select an option based on.
 * @param options - The options to select from.
 * @returns - The index of the option selected.
 */
async function cli_menu(question: string, options: string[]): Promise<number> {
  const prompt = inquirer.createPromptModule()

  const answer = await prompt({
    type: 'list',
    name: 'answer',
    message: question,
    choices: options,
  })

  return options.indexOf(answer.answer)
}

export default cli_menu
