import { State } from 'modules/state_machine'
import type { StateOnFunction } from 'modules/state_machine'
import { esrgan_x4 } from 'modules/esrgan'

/**
 * The on event function for the esrgan_x4 state.
 * Is called when the state machine transitions into this state.
 */
const esrgan_x4_on: StateOnFunction = async (_, cli, transition) => {
  cli.clear()

  const answer = await cli.question('Enter the path to the image to upscale: ')
  await esrgan_x4(answer, cli)

  return transition('landing_menu')
}

/**
 * The program state for the esrgan_x4 command state.
 */
export default new State('esrgan_x4', esrgan_x4_on)
