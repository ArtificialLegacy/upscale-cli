import { CliColor } from '../../cli'
import { State } from '../../state_machine'

/**
 * The program state for when either the user rejects to install esrgan, or the download fails.
 */
const esrgan_fail = new State((_, cli) => {
  cli.print(
    `${CliColor.Red}Cannot continue without esrgan, restart the program to install.${CliColor.Reset}`,
  )
  process.exit()
})

export default esrgan_fail
