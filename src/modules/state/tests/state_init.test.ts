import state_init from '../state_init'
import { StateMachine } from 'modules/state_machine'
import type { CliState } from '../types/cli_state'

const states: CliState[] = [
  'esrgan_verify',
  'esrgan_fail',
  'esrgan_download',
  'landing_menu',
  'esrgan_manage',
  'workload_menu',
  'esrgan_x4',
  'esrgan_animex4',
  'workload_finish',
]

// tests not that meaningful but were used to debug configuration edge cases with jest.
describe('state_init', () => {
  it('should return a state machine', async () => {
    const state = await state_init()
    expect(state).toBeInstanceOf(StateMachine)
  })

  it('should have all the states', async () => {
    const state = await state_init()
    expect(Object.entries(state['states'])).toHaveLength(states.length)
  })
})
