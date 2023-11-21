import { jest } from '@jest/globals'
import inquirer, { PromptModule } from 'inquirer'

import cli_menu from '../cli_menu'

describe('cli_menu', () => {
  test('should return the index of the option selected', async () => {
    inquirer.prompt = jest.fn().mockReturnValue({
      answer: 'option 2',
    }) as unknown as PromptModule

    const result = await cli_menu('question', [
      'option 1',
      'option 2',
      'option 3',
    ])

    expect(result).toBe(1)
  })
})
