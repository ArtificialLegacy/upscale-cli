import { StateMachine } from 'modules/state_machine'
import type { CliInstance } from 'modules/cli/types/cli_interface'

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
    .add_state([esrgan_verify, esrgan_fail, esrgan_download, landing_menu])
    .add_connection('esrgan_verify', 'esrgan_fail')
    .add_connection('esrgan_verify', 'esrgan_download')
    .add_connection('esrgan_download', 'esrgan_fail')
    .add_connection('esrgan_verify', 'landing_menu')
    .add_connection('esrgan_download', 'landing_menu')

  return state
}

export default state_init
