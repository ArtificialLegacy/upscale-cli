import fs from 'fs/promises'

import { CliControl, CliColor } from 'modules/cli'
import directory_exists from 'utility/directory_exists'

/**
 * Generic code to run before a workload specific code.
 * @param infile - The path to the input file.
 * @param workload - The name of the workload.
 * @returns The filename of the input file.
 */
async function workload_init(
  infile: string,
  workload: string,
): Promise<string> {
  CliControl.clear()

  const filename = infile.split('\\').pop()
  CliControl.print(
    `${CliColor.Cyan}!${CliColor.Reset} Running ${workload} on ${filename}\n`,
  )

  if (!(await directory_exists(`${global.__basedir}\\..\\outputs`))) {
    await fs.mkdir(`${global.__basedir}\\..\\outputs`)
  }

  return filename + ''
}

export default workload_init
