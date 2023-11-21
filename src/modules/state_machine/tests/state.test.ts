import { jest } from '@jest/globals'

import State from '../state'
import type { StateOnFunction, StateExitFunction } from '../state'

describe('State', () => {
  const on: StateOnFunction = jest.fn()
  const exit: StateExitFunction = jest.fn()
  const state = new State('landing_menu', on, exit)

  it('should have an id', () => {
    expect(state.id).toBe('landing_menu')
  })

  it('should have an on function', () => {
    expect(state.on).toBe(on)
  })

  it('should have an exit function', () => {
    expect(state.exit).toBe(exit)
  })
})
