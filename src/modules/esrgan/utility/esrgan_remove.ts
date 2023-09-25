import fs from 'fs'

/**
 * Removes the esrgan-tool folder.
 */
async function esrgan_remove(): Promise<null> {
  const promise = new Promise<null>((resolve, reject) => {
    fs.rm(
      `${global.__basedir}\\..\\esrgan-tool\\`,
      { recursive: true },
      (err) => {
        if (err) reject(err)
        else resolve(null)
      },
    )
  })

  return promise
}

export default esrgan_remove
