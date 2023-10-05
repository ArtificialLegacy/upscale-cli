import { command_run } from 'modules/cmd'
import workload_init from './workload_init'

/**
 * Runs RealESRGAN-x4plus-Anime model on the given image.
 * @param infile - The input file.
 * @param index - The index of the input file in a batch workload.
 * @param total - The total number of input files in a batch workload.
 */
async function esrgan_animex4(infile: string, index?: number, total?: number) {
  const filename = await workload_init(
    infile,
    'RealESRGAN-x4plus Anime',
    index,
    total,
  )

  await command_run(
    `${global.__basedir}\\..\\esrgan-tool\\realesrgan-ncnn-vulkan.exe -i ${infile} -o ${global.__basedir}\\..\\outputs\\up_${filename} -n realesrgan-x4plus-anime`,
  )
}

export default esrgan_animex4
