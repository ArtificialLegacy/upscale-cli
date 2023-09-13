import { State } from 'modules/state_machine'

/**
 * Program state for the landing menu.
 * The main menu that the user sees when they run the program.
 */
const landing_menu = new State(async (_, cli) => {
  const response = await cli.menu('Select task to perform:', [
    'Run Workload',
    'Manage Real-ESRGAN',
    'Exit',
  ])

  cli.clear()
  cli.print(response)
})

export default landing_menu
