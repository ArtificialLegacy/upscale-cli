import { stat } from 'fs'
import State from '../state'
import StateMachine from '../state_machine'
import type { CliState } from 'modules/state'

describe('StateMachine', () => {
  const state_machine = new StateMachine()

  const on = jest.fn()
  const exit = jest.fn()
  const state: State = new State('landing_menu', on, exit)
  state_machine.add_state(state)

  state_machine.transition('landing_menu')

  it('should add a state', () => {
    const state: State = new State('esrgan_fail', () => {})
    state_machine.add_state(state)
    expect(state_machine['states'][state.id]).toBe(state)
  })

  it('should throw an error when adding a state that already exists', () => {
    const state: State = new State('landing_menu', () => {})
    expect(() => state_machine.add_state(state)).toThrow(
      `State of id ${state.id} already exists.`,
    )
  })

  it('should add a connection', () => {
    const from: CliState = 'landing_menu'
    const to: CliState = 'workload_menu'
    state_machine.add_connection(from, to)
    expect(state_machine['connections'][from]).toContain(to)
  })

  it('should transition to a state', () => {
    const to: CliState = 'esrgan_manage'
    const toOn = jest.fn()
    const state = { id: to, on: toOn }

    state_machine.add_state(state)
    state_machine.add_connection('landing_menu', to)

    state_machine.transition(to)
    expect(state_machine.current).toBe(to)
    expect(exit).toHaveBeenCalled()
    expect(toOn).toHaveBeenCalled()
  })

  it('should throw an error when transitioning to a non-existent state', () => {
    const to = 'non-existent'
    // @ts-expect-error
    expect(() => state_machine.transition(to)).toThrow(
      `State of id ${to} does not exist.`,
    )
  })

  it('should throw an error when transitioning to an unconnected state', () => {
    const to = 'landing_menu'
    expect(() => state_machine.transition(to)).toThrow(
      `State of id ${to} is not connected to ${state_machine.current}`,
    )
  })
})
