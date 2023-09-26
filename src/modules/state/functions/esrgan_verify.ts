import { State, StateOnFunction } from 'modules/state_machine'
import { esrgan_verify as verify } from 'modules/esrgan'
import { CliColor, CliControl } from 'modules/cli'

/**
 * The on event function for the esrgan_verify state.
 * Is called when the state machine transitions into this state.
 */
const esrgan_verify_on: StateOnFunction = async (_, transition) => {
  const esrganExists = verify()
  if (esrganExists) return transition('landing_menu')

  const shouldDownload = await CliControl.question(
    `${CliColor.Red}!${CliColor.Reset} Real-ESRGAN was not found. Would you like to download it? (${CliColor.Green}Y${CliColor.Reset}/${CliColor.Red}N${CliColor.Reset}) `,
    {
      accepts: ['Y', 'N'],
      default: 'N',
      normalize: true,
    },
  )

  if (shouldDownload === 'N') return transition('esrgan_fail')
  if (shouldDownload === 'Y') return transition('esrgan_download')
}

/**
 * Program state for checking if the esrgan exists.
 * If it doesnt, transitions to either ESRGAN_Fail or ESRGAN_Download based on the user's prompt.
 * Transitions to ... if it does exist.
 */
export default new State('esrgan_verify', esrgan_verify_on)
