import { State } from 'modules/state_machine'
import type { StateOnFunction } from 'modules/state_machine'
import { esrgan_x4 } from 'modules/esrgan'
import { CliControl, CliColor } from 'modules/cli'
import file_exists from 'utility/file_exists'

/**
 * The on event function for the esrgan_x4 state.
 * Is called when the state machine transitions into this state.
 */
const esrgan_x4_on: StateOnFunction = async (_, transition) => {
  CliControl.clear()

  const answer = await CliControl.question(
    'Enter the path to the image to upscale: ',
  )

  if (!(await file_exists(answer))) {
    CliControl.print(
      `${CliColor.Red}! The given path is not a file.${CliColor.Reset}\n`,
    )
    return
  }

  await esrgan_x4(answer)

  return transition('landing_menu')
}

/**
 * The program state for the esrgan_x4 command state.
 */
export default new State('esrgan_x4', esrgan_x4_on)
