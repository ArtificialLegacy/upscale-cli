/**
 * Options provided to post-process a user's input to a quest.
 * @property normalize - Will convert the user input to all uppercase.
 * @property accepts - An array of strings that the user's input must be.
 * @property default - If the user's input is not accepted ^, it will be set to this value. If no default is provided, the promise will be rejected.
 */
type CliQuestionOptions = {
  normalize?: boolean
  accepts?: string[]
  default?: string
}

export type { CliQuestionOptions }
