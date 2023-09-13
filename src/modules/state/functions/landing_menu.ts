import { State } from 'modules/state_machine'

/**
 * Program state for the landing menu.
 * The main menu that the user sees when they run the program.
 */
const landing_menu = new State((_, cli) => {
  cli.print('test')
})

export default landing_menu
