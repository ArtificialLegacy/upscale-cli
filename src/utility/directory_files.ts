import fs from 'fs/promises'
import path from 'path'

/**
 * Reads the given directory and returns a list of image files within it.
 * @param dir - The directory to read.
 * @returns - A list of image files within the given directory.
 */
async function directory_files(dir: string): Promise<string[]> {
  const files = await fs.readdir(dir)

  return files.filter((file) => ['.png', '.jpg'].includes(path.extname(file)))
}

export default directory_files
