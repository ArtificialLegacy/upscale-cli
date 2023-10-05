import { State } from 'modules/state_machine'
import type { StateOnFunction } from 'modules/state_machine'
import { esrgan_animex4, workload_begin } from 'modules/esrgan'
import { CliControl } from 'modules/cli'
import file_exists from 'utility/file_exists'
import directory_exists from 'utility/directory_exists'
import directory_files from 'utility/directory_files'

const esrgan_animex4_on: StateOnFunction = async (_, transition) => {
  CliControl.clear()

  const answer = await workload_begin()

  const file = await file_exists(answer)
  const dir = await directory_exists(answer)

  if (file) await esrgan_animex4(answer)

  if (dir) {
    const files = await directory_files(answer)

    for (const [index, file] of files.entries()) {
      await esrgan_animex4(`${answer}\\${file}`, index, files.length)
    }
  }

  return transition('workload_finish')
}

export default new State('esrgan_animex4', esrgan_animex4_on)
