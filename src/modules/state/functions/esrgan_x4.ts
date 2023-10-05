import { State } from 'modules/state_machine'
import type { StateOnFunction } from 'modules/state_machine'
import { esrgan_x4, workload_begin } from 'modules/esrgan'
import { CliControl } from 'modules/cli'
import file_exists from 'utility/file_exists'
import directory_exists from 'utility/directory_exists'
import directory_files from 'utility/directory_files'

/**
 * The on event function for the esrgan_x4 state.
 * Is called when the state machine transitions into this state.
 */
const esrgan_x4_on: StateOnFunction = async (_, transition) => {
  CliControl.clear()

  const answer = await workload_begin()

  if (answer === '') return transition('workload_finish')

  const file = await file_exists(answer)
  const dir = await directory_exists(answer)

  if (file) await esrgan_x4(answer)

  if (dir) {
    const files = await directory_files(answer)

    for (const [index, file] of files.entries()) {
      await esrgan_x4(`${answer}\\${file}`, index, files.length)
    }
  }

  return transition('workload_finish')
}

/**
 * The program state for the esrgan_x4 command state.
 */
export default new State('esrgan_x4', esrgan_x4_on)
