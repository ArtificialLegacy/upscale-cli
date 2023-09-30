import { State } from 'modules/state_machine'
import type { StateOnFunction } from 'modules/state_machine'
import { esrgan_animex4, workload_begin } from 'modules/esrgan'
import { CliControl } from 'modules/cli'

const esrgan_animex4_on: StateOnFunction = async (_, transition) => {
  CliControl.clear()

  const answer = await workload_begin()
  await esrgan_animex4(answer)

  return transition('workload_finish')
}

export default new State('esrgan_animex4', esrgan_animex4_on)
