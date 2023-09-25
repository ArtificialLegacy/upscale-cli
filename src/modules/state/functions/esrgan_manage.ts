import { State } from 'modules/state_machine'
import type { StateOnFunction } from 'modules/state_machine'
import { esrgan_remove } from 'modules/esrgan'

/**
 * The on event function for the esrgan_manage state.
 * Is called when the state machine transitions into this state.
 */
const esrgan_manage_on: StateOnFunction = async (_, cli, transition) => {
  cli.clear()

  const response = await cli.menu('Select task to perform:', [
    'Repair/Update Installation',
    'Uninstall',
    'Back',
  ])

  switch (response) {
    case 0: {
      await esrgan_remove()
      transition('esrgan_download')
      break
    }

    case 1: {
      await esrgan_remove()
      transition('esrgan_fail')
      break
    }

    case 2: {
      transition('landing_menu')
      break
    }
  }
}

/**
 * The program state for managing esrgan.
 */
export default new State('esrgan_manage', esrgan_manage_on)
