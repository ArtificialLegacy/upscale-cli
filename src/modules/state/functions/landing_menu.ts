import { State } from 'modules/state_machine'
import type { StateOnFunction } from 'modules/state_machine'

/**
 * The on event function for the landing_menu state.
 * Is called when the state machine transitions into this state.
 */
const landing_menu_on: StateOnFunction = async (_, cli, transition) => {
  cli.clear()

  const response = await cli.menu('Select task to perform:', [
    'Run Workload',
    'Manage Real-ESRGAN',
    'Exit',
  ])

  switch (response) {
    case 0: {
    }
    case 1: {
      transition('esrgan_manage')
      return
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
