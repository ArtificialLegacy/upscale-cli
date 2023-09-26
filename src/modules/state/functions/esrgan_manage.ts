import { State } from 'modules/state_machine'
import type { StateOnFunction } from 'modules/state_machine'
import { esrgan_remove } from 'modules/esrgan'
import { CliControl } from 'modules/cli'

/**
 * The on event function for the esrgan_manage state.
 * Is called when the state machine transitions into this state.
 */
const esrgan_manage_on: StateOnFunction = async (_, transition) => {
  CliControl.clear()

  const response = await CliControl.menu('Select task to perform:', [
    'Repair/Update Installation',
    'Uninstall',
    'Back',
  ])

  switch (response) {
    case 0: {
      await esrgan_remove()
      return transition('esrgan_download')
    }

    case 1: {
      await esrgan_remove()
      return transition('esrgan_fail')
    }

    case 2: {
      return transition('landing_menu')
    }
  }
}

/**
 * The program state for managing esrgan.
 */
export default new State('esrgan_manage', esrgan_manage_on)
