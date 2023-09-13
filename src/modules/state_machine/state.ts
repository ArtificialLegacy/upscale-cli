import type { CliInstance } from 'modules/cli/types/cli_interface'

/**
 * A state node containing the on and exit functions for that node.
 */
class State {
  public readonly on: (
    from: number,
    cli: CliInstance,
    transition: (to: number) => void,
  ) => void
  public readonly exit?: (to: number, cli: CliInstance) => void

  /**
   * @param on - The function to call when the state is entered.
   * @param exit - The function to call when the state is exitted.
   */
  constructor(
    on: (
      from: number,
      cli: CliInstance,
      transition: (to: number) => void,
    ) => void,
    exit?: (to: number, cli: CliInstance) => void,
  ) {
    this.on = on
    this.exit = exit
  }
}

export default State
