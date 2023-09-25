import fs from 'fs'

/**
 * Removes the esrgan-tool folder.
 */
function esrgan_remove() {
  fs.unlink(`${global.__basedir}\\..\\esrgan-tool`, () => {})
}

export default esrgan_remove
