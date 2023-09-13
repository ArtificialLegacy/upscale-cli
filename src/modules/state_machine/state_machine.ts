import type { CliInstance } from 'modules/cli/types/cli_interface'
import type State from './state'

/**
 * Class used to manage the program's state.
 * Only one instance should exist.
 */
class StateMachine {
  private connections: { [key: number]: number[] }
  private states: { [key: number]: State }
  public current: number
  private cliInstance: CliInstance

  /**
   * @param cli - An already created cli instance,
   * used to give access to it in the different states by passing it as an argument.
   */
  constructor(cli: CliInstance) {
    this.connections = {}
    this.states = []
    this.current = -1

    this.cliInstance = cli

    // used to make sure state machine methods stay binded when passed into state functions.
    Object.getOwnPropertyNames(StateMachine.prototype).forEach((key) => {
      if (key !== 'constructor') {
        // ignored bc typescript doesn't understand accessing 'this' with strings
        // @ts-ignore
        this[key] = this[key].bind(this)
      }
    })
  }

  /**
   * Adds an unconnected state to the state machine's graph.
   * @param id - The id to use to store the state.
   * @param state - The state to add.
   */
  public add_state(id: number, state: State) {
    if (this.states[id]) throw `State of id ${id} already exists.`

    this.states[id] = state
  }

  /**
   * Adds a one way connection between two states.
   * @param from - The state to transition from.
   * @param to - The state to transition to.
   */
  public add_connection(from: number, to: number) {
    const edges = this.connections[from] ?? []
    if (edges.includes(to)) return

    edges.push(to)
    this.connections[from] = edges
  }

  /**
   * Transitions to a different state, and calls the on and exit functions for the relevant states.
   * @param to - The state to transition to.
   */
  public transition(to: number) {
    if (!this.states[to]) throw `State of id ${to} does not exist.`

    if (this.current === -1) {
      this.current = to
      this.states[to].on(-1, this.cliInstance, this.transition)
      return
    }

    if (!this.connections[this.current]?.includes(to))
      throw `State of id ${to} is not connected to ${this.current}`

    this.states[this.current].exit?.(to, this.cliInstance)
    const prev = this.current
    this.current = to
    this.states[to].on(prev, this.cliInstance, this.transition)
  }
}

export default StateMachine
