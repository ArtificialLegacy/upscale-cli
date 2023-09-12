import fs from 'fs'

/**
 * Verifies if esrgan is installed.
 * @returns true if esrgan is installed, else false
 */
function esrgan_verify(): boolean {
  const exists = fs.existsSync(`${global.__basedir}\\..\\esrgan-tool\\`)

  return exists
}

export default esrgan_verify
