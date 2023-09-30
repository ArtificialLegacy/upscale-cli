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
): Promise<number | null> {
  const promise = new Promise<number | null>((resolve, reject) => {
    const child = spawn(command, [], { shell: true, stdio })

    child.on('exit', (code) => {
      if (code === 0) resolve(0)
      else reject(code)
    })

    child.on('error', () => {
      reject(null)
    })
  })

  return promise
}

export default command_run
