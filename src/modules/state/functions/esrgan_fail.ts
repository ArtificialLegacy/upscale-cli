import { CliColor, CliControl } from 'modules/cli'
import { State, StateOnFunction } from 'modules/state_machine'

/**
 * The on event function for the esrgan_fail state.
 * Is called when the state machine transitions into this state.
 */
const esrgan_fail_on: StateOnFunction = (_) => {
  CliControl.print(
    `\n${CliColor.Red}Cannot continue without esrgan, restart the program to attempt to install.${CliColor.Reset}\n`,
  )

  process.exit()
}

/**
 * The program state for when either the user rejects to install esrgan, or the download fails.
 */
export default new State('esrgan_fail', esrgan_fail_on)
