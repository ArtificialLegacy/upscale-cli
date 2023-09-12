import { spawn } from 'child_process'
import type { StdioOptions } from 'child_process'

/**
 * Runs a shell command using child_process.spawn.
 * @param command - The shell command to run.
 * @param stdio - The stdio option to pass to child_process.spawn.
 * @returns A promise that resolves when the command exits.
 */
function command_run(
  command: string,
  stdio: StdioOptions = 'inherit',
): Promise<boolean> {
  const promise = new Promise<boolean>((resolve, reject) => {
    const child = spawn(command, [], { shell: true, stdio })

    child.on('exit', (code) => {
      if (code === 0) resolve(true)
      else reject(false)
    })

    child.on('error', () => {
      reject(false)
    })
  })

  return promise
}

export default command_run
