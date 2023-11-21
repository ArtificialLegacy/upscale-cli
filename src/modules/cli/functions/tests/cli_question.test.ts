import { jest } from '@jest/globals'
import inquirer, { PromptModule } from 'inquirer'

import cli_question from '../cli_question'

describe('cli_question', () => {
  test('should return the user input', async () => {
    inquirer.prompt = jest.fn().mockReturnValue({
      answer: 'answer',
    }) as unknown as PromptModule

    const result = await cli_question('question', {})

    expect(result).toBe('answer')
  })

  test('should trim the user input', async () => {
    inquirer.prompt = jest.fn().mockReturnValue({
      answer: ' answer ',
    }) as unknown as PromptModule

    const result = await cli_question('question', {})

    expect(result).toBe('answer')
  })

  test('should normalize the user input', async () => {
    inquirer.prompt = jest.fn().mockReturnValue({
      answer: 'answer',
    }) as unknown as PromptModule

    const result = await cli_question('question', { normalize: true })

    expect(result).toBe('ANSWER')
  })

  test('should accept the user input', async () => {
    inquirer.prompt = jest.fn().mockReturnValue({
      answer: 'answer',
    }) as unknown as PromptModule

    const result = await cli_question('question', { accepts: ['answer'] })

    expect(result).toBe('answer')
  })

  test('should reject the user input', async () => {
    inquirer.prompt = jest.fn().mockReturnValue({
      answer: 'answer',
    }) as unknown as PromptModule

    await expect(
      cli_question('question', { accepts: ['not answer'] }),
    ).rejects.toThrow('No default provided, and answer not accepted.')
  })

  test('should return the default', async () => {
    inquirer.prompt = jest.fn().mockReturnValue({
      answer: 'answer',
    }) as unknown as PromptModule

    const result = await cli_question('question', {
      accepts: ['not answer'],
      default: 'answer',
    })

    expect(result).toBe('answer')
  })

  test('should return the default if the user input is empty', async () => {
    inquirer.prompt = jest.fn().mockReturnValue({
      answer: '',
    }) as unknown as PromptModule

    const result = await cli_question('question', {
      accepts: ['not answer'],
      default: 'answer',
    })

    expect(result).toBe('answer')
  })
})
