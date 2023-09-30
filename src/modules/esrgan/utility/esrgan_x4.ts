import { command_run } from 'modules/cmd'
import workload_init from './workload_init'

/**
 * Runs RealESRGAN-x4plus model on the given image.
 * @param infile - The input file.
 * @param cli - The CLI instance.
 */
async function esrgan_x4(infile: string) {
  const filename = await workload_init(infile, 'RealESRGAN-x4plus')

  await command_run(
    `${global.__basedir}\\..\\esrgan-tool\\realesrgan-ncnn-vulkan.exe -i ${infile} -o ${global.__basedir}\\outputs\\up_${filename} -n realesr-x4plus`,
  )
}

export default esrgan_x4
