import { StateMachine } from 'modules/state_machine'

import esrgan_verify from './functions/esrgan_verify'
import esrgan_fail from './functions/esrgan_fail'
import esrgan_download from './functions/esrgan_download'
import landing_menu from './functions/landing_menu'
import esrgan_manage from './functions/esrgan_manage'
import workloads_menu from './functions/workloads_menu'
import esrgan_x4 from './functions/esrgan_x4'
import workload_finish from './functions/workload_finish'

/**
 * Initialized the program's state machine and adds all the connections between states.
 * @returns The state machine created.
 */
function state_init(): StateMachine {
  const state = new StateMachine()
    .add_state([
      esrgan_verify,
      esrgan_fail,
      esrgan_download,
      landing_menu,
      esrgan_manage,
      workloads_menu,
      esrgan_x4,
      workload_finish,
    ])
    .add_connection('esrgan_verify', 'esrgan_fail')
    .add_connection('esrgan_verify', 'esrgan_download')
    .add_connection('esrgan_download', 'esrgan_fail')
    .add_connection('esrgan_verify', 'landing_menu')
    .add_connection('esrgan_download', 'landing_menu')
    .add_connection('landing_menu', 'esrgan_manage')
    .add_connection('esrgan_manage', 'esrgan_fail')
    .add_connection('esrgan_manage', 'esrgan_download')
    .add_connection('esrgan_manage', 'landing_menu')
    .add_connection('landing_menu', 'workloads_menu')
    .add_connection('workloads_menu', 'landing_menu')
    .add_connection('workloads_menu', 'esrgan_x4')
    .add_connection('esrgan_x4', 'workload_finish')
    .add_connection('workload_finish', 'landing_menu')

  return state
}

export default state_init
