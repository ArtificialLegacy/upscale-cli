import { State } from 'modules/state_machine'
import type { StateOnFunction } from 'modules/state_machine'

/**
 * The on event function for the workloads_menu state.
 * Is called when the state machine transitions into this state.
 */
const workloads_menu_on: StateOnFunction = async (_, cli, transition) => {
  cli.clear()

  const response = await cli.menu('Select workload to run:', [
    'RealESRGAN-x4plus',
    'RealESRGAN-x4plus-anime',
    'RealESRGAN-animevideov3',
    'Back',
  ])

  switch (response) {
    case 3: {
      return transition('landing_menu')
    }
  }
}

/**
 * The program state for the workloads menu.
 */
export default new State('workloads_menu', workloads_menu_on)