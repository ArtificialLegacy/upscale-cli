import { command_run } from 'modules/cmd'
import workload_init from './workload_init'

async function esrgan_animex4(infile: string) {
  const filename = await workload_init(infile, 'RealESRGAN-x4plus Anime')

  await command_run(
    `${global.__basedir}\\..\\esrgan-tool\\realesrgan-ncnn-vulkan.exe -i ${infile} -o ${global.__basedir}\\..\\outputs\\up_${filename} -n realesrgan-x4plus-anime`,
  )
}

export default esrgan_animex4
