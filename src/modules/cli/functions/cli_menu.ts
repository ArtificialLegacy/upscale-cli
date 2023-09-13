import type { CliInstance } from '../types/cli_interface'
import { CliColor } from '..'

/**
 * A class to create a menu for the user to select an option from.
 *
 * @property question - The header question for the user to select an option based on.
 * @property options - The options to select from.
 * @property cli - The cli interface to use.
 * @property input - The index of the option selected.
 * @property cursor - The current cursor y position.
 */
class CliMenu {
  private question: string
  private options: string[]
  private cli: CliInstance

  private input: number
  private cursor: number

  constructor(question: string, options: string[], cli: CliInstance) {
    this.question = question
    this.options = options
    this.cli = cli

    this.input = 0
    this.cursor = 0
  }

  /**
   * Prints the menu and starts watching for user input.
   * @param resolve - The cli menu promise resolve function.
   */
  public start(resolve: (value: number) => void) {
    process.stdout.write(`${CliColor.Red}!${CliColor.Reset} ${this.question}\n`)

    for (let i = 0; i < this.options.length; ++i) {
      if (i === this.options.length - 1) {
        this.input = this.options.length - 1
        this.options[i] += '\n'

        this.print_selected(this.options[i])
      } else {
        this.options[i] += '\n'
        this.print_unselected(this.options[i])
      }

      this.cursor = i + 1
    }

    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf-8')
    this.cli.cursor_hide()

    process.stdin.on('data', this.on_data(resolve))
  }

  /**
   * Handles user input into the cli menu.
   * @param resolve - The cli menu promise resolve function.
   */
  private on_data(resolve: (value: number) => void) {
    return (c: string) => {
      switch (c) {
        case '\u0004':
        case '\r':
        case '\n': {
          this.enter(resolve)
          break
        }

        case '\u0003': {
          this.ctrlc()
          break
        }

        case '\u001b[A': {
          this.arrow_up()
          break
        }

        case '\u001b[B': {
          this.arrow_down()
          break
        }
      }
    }
  }

  /**
   * Handles the up arrow key press.
   */
  private arrow_up() {
    let y = this.cursor
    this.cli.cursor_move(y)

    this.print_unselected(this.options[y - 1])

    if (this.cursor === 1) this.cursor = this.options.length
    else this.cursor--

    y = this.cursor
    this.cli.cursor_move(y)
    this.input = y - 1

    this.print_selected(this.options[y - 1])
  }

  /**
   * Handles the down arrow key press.
   */
  private arrow_down() {
    let y = this.cursor
    this.cli.cursor_move(y)

    this.print_unselected(this.options[y - 1])

    if (this.cursor === this.options.length) this.cursor = 1
    else this.cursor++

    y = this.cursor
    this.cli.cursor_move(y)
    this.input = y - 1

    this.print_selected(this.options[this.input])
  }

  /**
   * Handles the enter key press.
   * @param resolve - The cli menu promise resolve function.
   */
  private enter(resolve: (value: number) => void) {
    this.clean()

    this.cli.cursor_move(this.options.length + 1)

    resolve(this.input)
  }

  /**
   * Handles the ctrl + c key press.
   */
  private ctrlc() {
    this.clean()
  }

  /**
   * Prints an option string with the selected indicator.
   * @param option - The option to print.
   */
  private print_selected(option: string) {
    process.stdout.write(`  ${CliColor.Cyan}> ${option}${CliColor.Reset}`)
  }

  /**
   * Prints an option string without the selected indicator.
   * @param option - The option to print.
   */
  private print_unselected(option: string) {
    process.stdout.write(`  - ${option}`)
  }

  /**
   * Cleans up the cli menu when closing it.
   */
  private clean() {
    process.stdin.removeListener('data', this.on_data)
    process.stdin.setRawMode(false)
    process.stdin.pause()
    this.cli.cursor_show()
  }
}

/**
 * Creates a menu for the user to select an option from.
 * @param cli - The cli interface to use.
 * @param question - The header question for the user to select an option based on.
 * @param options - The options to select from.
 * @returns - The index of the option selected.
 */
function cli_menu(
  cli: CliInstance,
  question: string,
  options: string[],
): Promise<number> {
  const promise = new Promise<number>((resolve) => {
    new CliMenu(question, options, cli).start(resolve)
  })

  return promise
}

export default cli_menu
