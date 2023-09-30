import { State } from 'modules/state_machine'
import type { StateOnFunction } from 'modules/state_machine'
import { esrgan_x4, workload_begin } from 'modules/esrgan'
import { CliControl } from 'modules/cli'

/**
 * The on event function for the esrgan_x4 state.
 * Is called when the state machine transitions into this state.
 */
const esrgan_x4_on: StateOnFunction = async (_, transition) => {
  CliControl.clear()

  const answer = await workload_begin()
  await esrgan_x4(answer)

  return transition('workload_finish')
}

/**
 * The program state for the esrgan_x4 command state.
 */
export default new State('esrgan_x4', esrgan_x4_on)
