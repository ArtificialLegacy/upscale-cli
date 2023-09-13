import { unlink } from 'fs'

import { command_run } from 'modules/cmd'
import { State } from 'modules/state_machine'
import { CliColor } from 'modules/cli'
import { CliState } from 'modules/state'

/**
 * The program state for downloading esrgan.
 */
const esrgan_download = new State(async (_, cli, transition) => {
  cli.print('\n-------- Downloading ESRGAN --------\n')

  const downloadResult = await command_run(
    `curl -LO ${process.env.ESRGAN_DOWNLOAD_URL}${process.env.ESRGAN_FOLDER_NAME}.zip -fail`,
    'inherit',
  ).catch(() => false)

  if (!downloadResult) return transition(CliState.ESRGAN_Fail)

  cli.print(
    `\n${CliColor.Green}Downloaded ESRGAN. Unzipping...${CliColor.Reset}\n`,
  )

  await command_run(`mkdir ${global.__basedir}\\..\\esrgan-tool\\`)

  const unzipResult = await command_run(
    `tar -xf ${process.env.ESRGAN_FOLDER_NAME}.zip -C ${global.__basedir}\\..\\esrgan-tool\\ --verbose`,
    'inherit',
  ).catch(() => false)

  unlink(`${process.env.ESRGAN_FOLDER_NAME}.zip`, () => {})

  if (!unzipResult) {
    unlink(`${global.__basedir}\\..\\esrgan-tool`, () => {})

    return transition(CliState.ESRGAN_Fail)
  }

  transition(CliState.Landing_Menu)
})

export default esrgan_download
