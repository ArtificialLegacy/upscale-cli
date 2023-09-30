import fs from 'fs/promises'

import { command_run } from 'modules/cmd'
import { CliControl } from 'modules/cli'
import directory_exists from 'utility/directory_exists'

/**
 * Runs RealESRGAN-x4plus model on the given image.
 * @param infile - The input file.
 * @param cli - The CLI instance.
 */
async function esrgan_x4(infile: string) {
  CliControl.clear()

  const filename = infile.split(/\\\//g).pop()
  CliControl.print(`Running RealESRGAN-x4plus on ${filename}`)

  if (!(await directory_exists(`${global.__basedir}\\..\\outputs`))) {
    await fs.mkdir(`${global.__basedir}\\..\\outputs`)
  }

  await command_run(
    `${global.__basedir}\\..\\esrgan-tool\\realesrgan-ncnn-vulkan.exe -i ${infile} -o ${global.__basedir}\\outputs\\up_${filename} -n realesr-x4plus`,
  )
}

export default esrgan_x4
