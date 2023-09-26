import fs from 'fs/promises'

import { State } from 'modules/state_machine'
import type { StateOnFunction } from 'modules/state_machine'
import { esrgan_x4 } from 'modules/esrgan'
import { CliControl } from 'modules/cli'

/**
 * The on event function for the esrgan_x4 state.
 * Is called when the state machine transitions into this state.
 */
const esrgan_x4_on: StateOnFunction = async (_, transition) => {
  CliControl.clear()

  const answer = await CliControl.question(
    'Enter the path to the image to upscale: ',
  )

  if (!(await fs.stat(answer)).isFile()) {
    CliControl.print('The given path is not a file.')
    return transition('esrgan_x4')
  }

  await esrgan_x4(answer)

  return transition('landing_menu')
}

/**
 * The program state for the esrgan_x4 command state.
 */
export default new State('esrgan_x4', esrgan_x4_on)
