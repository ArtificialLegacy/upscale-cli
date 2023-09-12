import { State } from '../../state_machine'
import { esrgan_verify as verify } from '../../esrgan'
import { CliColor } from '../../cli'
import CliState from '../constants/cli_state'

/**
 * Program state for checking if the esrgan exists.
 * If it doesnt, transitions to either ESRGAN_Fail or ESRGAN_Download based on the user's prompt.
 * Transitions to ... if it does exist.
 */
const esrgan_verify = new State(async (_, cli, transition) => {
  const esrganExists = verify()

  if (!esrganExists) {
    const shouldDownload = await cli.question(
      `${CliColor.Red}!${CliColor.Reset} Real-ESRGAN was not found. Would you like to download it? (${CliColor.Green}Y${CliColor.Reset}/${CliColor.Red}N${CliColor.Reset}) `,
      {
        accepts: ['Y', 'N'],
        default: 'N',
        normalize: true,
      },
    )

    if (shouldDownload === 'N') return transition(CliState.ESRGAN_Fail)
    if (shouldDownload === 'Y') return transition(CliState.ESRGAN_Download)
  }
})

export default esrgan_verify
