import type { CliInstance } from 'modules/cli/types/cli_interface'
import type { CliState } from 'modules/state'

/**
 * @param from - The state that the state machine is transitioning from.
 * @param cli - The cli instance.
 * @param transition - The function to call to transition to another state.
 */
type StateOnFunction = (
  from: CliState | null,
  cli: CliInstance,
  transition: (to: CliState) => void,
) => void

/**
 * @param to - The state that the state machine is transitioning to.
 * @param cli - The cli instance.
 */
type StateExitFunction = (to: CliState, cli: CliInstance) => void

/**
 * A state node containing the on and exit functions for that node.
 */
class State {
  /**
   * @param id - The id to use to store the state.
   * @param on - The function to call when the state is entered.
   * @param exit - The function to call when the state is exitted.
   */
  constructor(
    public id: CliState,
    public on: StateOnFunction,
    public exit?: StateExitFunction,
  ) {}
}

export default State
export type { StateOnFunction, StateExitFunction }
