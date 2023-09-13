import CliState from './constants/cli_state'
import { StateMachine } from '../state_machine'
import type { CliInstance } from '../cli/types/cli_interface'

import esrgan_verify from './functions/esrgan_verify'
import esrgan_fail from './functions/esrgan_fail'
import esrgan_download from './functions/esrgan_download'
import landing_menu from './functions/landing_menu'

/**
 * Initialized the program's state machine and adds all the connections between states.
 * @param cli - The cli instance to pass into the state machine, will be passed into the state's function calls.
 * @returns The state machine created.
 */
function state_init(cli: CliInstance): StateMachine {
  const state = new StateMachine(cli)

  state.add_state(CliState.ESRGAN_Verify, esrgan_verify)
  state.add_state(CliState.ESRGAN_Fail, esrgan_fail)
  state.add_state(CliState.ESRGAN_Download, esrgan_download)
  state.add_state(CliState.Landing_Menu, landing_menu)

  state.add_connection(CliState.ESRGAN_Verify, CliState.ESRGAN_Fail)
  state.add_connection(CliState.ESRGAN_Verify, CliState.ESRGAN_Download)
  state.add_connection(CliState.ESRGAN_Download, CliState.ESRGAN_Fail)
  state.add_connection(CliState.ESRGAN_Verify, CliState.Landing_Menu)
  state.add_connection(CliState.ESRGAN_Download, CliState.Landing_Menu)

  return state
}

export default state_init
