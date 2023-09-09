import type readline from 'readline'

// The type structure for the interface wrapper class
type CliInstance = {
  /**
   * A wrapper to print to the cli interface in use
   * @param value - The value to print.
   */
  print: (...value: any[]) => void
}

// The type of the cli interface library used.
type CliInterface = readline.Interface

export type { CliInstance, CliInterface }
