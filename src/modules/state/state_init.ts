import { StateMachine } from 'modules/state_machine'
import type { CliState } from './types/cli_state'

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

/**
 * Initialized the program's state machine and adds all the connections between states.
 * @returns The state machine created.
 */
async function state_init(): Promise<StateMachine> {
  const state = new StateMachine()

  for (const s of states) {
    const module = await import(`./functions/${s}.ts`)
    state.add_state(module.default)
  }

  state
    .add_connection('esrgan_verify', 'esrgan_fail')
    .add_connection('esrgan_verify', 'esrgan_download')
    .add_connection('esrgan_download', 'esrgan_fail')
    .add_connection('esrgan_verify', 'landing_menu')
    .add_connection('esrgan_download', 'landing_menu')
    .add_connection('landing_menu', 'esrgan_manage')
    .add_connection('esrgan_manage', 'esrgan_fail')
    .add_connection('esrgan_manage', 'esrgan_download')
    .add_connection('esrgan_manage', 'landing_menu')
    .add_connection('landing_menu', 'workload_menu')
    .add_connection('workload_menu', 'landing_menu')
    .add_connection('workload_menu', 'esrgan_x4')
    .add_connection('workload_menu', 'esrgan_animex4')
    .add_connection('esrgan_x4', 'workload_finish')
    .add_connection('esrgan_animex4', 'workload_finish')
    .add_connection('workload_finish', 'landing_menu')

  return state
}

export default state_init
