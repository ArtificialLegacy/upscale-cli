import { CliColor } from 'modules/cli'
import { State } from 'modules/state_machine'

/**
 * The program state for when either the user rejects to install esrgan, or the download fails.
 */
const esrgan_fail = new State((_, cli) => {
  cli.print(
    `\n${CliColor.Red}Cannot continue without esrgan, restart the program to attempt to install.${CliColor.Reset}\n`,
  )
  process.exit()
})

export default esrgan_fail
