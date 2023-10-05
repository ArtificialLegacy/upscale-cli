import { CliControl, CliColor } from 'modules/cli'
import directory_exists from 'utility/directory_exists'
import file_exists from 'utility/file_exists'

/**
 * Runs the pre-workload prompt and checks.
 * @returns The path to the image to upscale, or an empty string if the path is invalid.
 */
async function workload_begin(): Promise<string> {
  const answer = await CliControl.question(
    'Enter the path to the image to upscale: ',
  )

  if (!(await file_exists(answer)) && !(await directory_exists(answer))) {
    CliControl.print(
      `${CliColor.Red}! The given path is not a file or directory.${CliColor.Reset}`,
    )
    return ''
  }

  return answer
}

export default workload_begin
