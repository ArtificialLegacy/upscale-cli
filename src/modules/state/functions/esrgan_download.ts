import fs from 'fs'

import { command_run } from 'modules/cmd'
import { State } from 'modules/state_machine'
import type { StateOnFunction } from 'modules/state_machine'
import { CliColor } from 'modules/cli'
import { esrgan_remove } from 'modules/esrgan'
import { CliControl } from 'modules/cli'

/**
 * The on event function for the esrgan_download state.
 * Is called when the state machine transitions into this state.
 */
const esrgan_download_on: StateOnFunction = async (_, transition) => {
  CliControl.print('\n-------- Downloading ESRGAN --------\n')

  const downloadResult = await command_run(
    `curl -LO ${process.env.ESRGAN_DOWNLOAD_URL}${process.env.ESRGAN_FOLDER_NAME}.zip -fail`,
    'inherit',
  )
    .then(() => true)
    .catch(() => false)

  if (!downloadResult) return transition('esrgan_fail')

  CliControl.print(
    `\n${CliColor.Green}Downloaded ESRGAN. Unzipping...${CliColor.Reset}\n`,
  )

  await command_run(`mkdir ${global.__basedir}\\..\\esrgan-tool\\`)

  const unzipResult = await command_run(
    `tar -xf ${process.env.ESRGAN_FOLDER_NAME}.zip -C ${global.__basedir}\\..\\esrgan-tool\\ --verbose`,
    'inherit',
  )
    .then(() => true)
    .catch(() => false)

  fs.unlink(`${process.env.ESRGAN_FOLDER_NAME}.zip`, () => {})

  if (!unzipResult) {
    esrgan_remove()
    return transition('esrgan_fail')
  }

  transition('landing_menu')
}

/**
 * The program state for downloading esrgan.
 */
export default new State('esrgan_download', esrgan_download_on)
