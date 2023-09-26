import { State } from 'modules/state_machine'
import type { StateOnFunction } from 'modules/state_machine'
import { CliControl } from 'modules/cli'

/**
 * The on event function for the landing_menu state.
 * Is called when the state machine transitions into this state.
 */
const landing_menu_on: StateOnFunction = async (_, transition) => {
  CliControl.clear()

  const response = await CliControl.menu('Select task to perform:', [
    'Run Workload',
    'Manage Real-ESRGAN',
    'Exit',
  ])

  switch (response) {
    case 0: {
      return transition('workloads_menu')
    }
    case 1: {
      return transition('esrgan_manage')
    }
    case 2: {
      return
    }
  }
}

/**
 * Program state for the landing menu.
 * The main menu that the user sees when they run the program.
 */
export default new State('landing_menu', landing_menu_on)
