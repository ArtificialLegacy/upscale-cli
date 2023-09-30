import { State } from 'modules/state_machine'
import type { StateOnFunction } from 'modules/state_machine'
import { CliControl } from 'modules/cli'

const workload_finish: StateOnFunction = async (_, transition) => {
  CliControl.print('\n')

  await CliControl.question('Workload Finished. Press enter to continue...')

  return transition('landing_menu')
}

/**
 * The program state for when a workload finishes.
 */
export default new State('workload_finish', workload_finish)
