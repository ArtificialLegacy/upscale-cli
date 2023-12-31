import type { CliState } from 'modules/state'
import type State from './state'

/**
 * Class used to manage the program's state.
 * Only one instance should exist.
 */
class StateMachine {
  private connections: { [key in CliState]?: CliState[] } = {}
  private states: { [key in CliState]?: State }
  public current: CliState | null

  constructor() {
    this.connections = {}
    this.states = {}
    this.current = null

    // used to make sure state machine methods stay binded when passed into state functions.
    const bindProps = Object.getOwnPropertyNames(StateMachine.prototype) as (
      | keyof StateMachine
      | 'constructor'
    )[]

    bindProps.forEach((key) => {
      const value = this[key]
      if (key !== 'constructor' && typeof value === 'function') {
        this[key] = value.bind(this)
      }
    })
  }

  /**
   * Adds an unconnected state to the state machine's graph.
   * @param state - The state(s) to add.
   */
  public add_state(state: State | State[]): StateMachine {
    if (Array.isArray(state)) {
      state.forEach((s) => this.add_state(s))
      return this
    }

    if (this.states[state.id]) throw `State of id ${state.id} already exists.`

    this.states[state.id] = state

    return this
  }

  /**
   * Adds a one way connection between two states.
   * @param from - The state to transition from.
   * @param to - The state to transition to.
   */
  public add_connection(from: CliState, to: CliState): StateMachine {
    const edges = this.connections[from] ?? []
    if (edges.includes(to)) return this

    edges.push(to)
    this.connections[from] = edges

    return this
  }

  /**
   * Transitions to a different state, and calls the on and exit functions for the relevant states.
   * @param to - The state to transition to.
   */
  public transition(to: CliState) {
    const toState = this.states[to]
    if (!toState) throw `State of id ${to} does not exist.`

    if (this.current == null) {
      this.current = to
      toState.on(null, this.transition)
      return
    }

    if (!this.connections[this.current]?.includes(to))
      throw `State of id ${to} is not connected to ${this.current}`

    this.states[this.current]?.exit?.(to)
    const prev = this.current
    this.current = to
    toState.on(prev, this.transition)
  }
}

export default StateMachine
