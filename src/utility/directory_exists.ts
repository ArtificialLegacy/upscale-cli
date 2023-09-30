import fs from 'fs/promises'

/**
 * Check if a directory exists.
 * @param filepath - The path to the directory to check.
 * @returns A promise that resolves to true if the directory exists, false otherwise.
 */
async function directory_exists(filepath: string): Promise<boolean> {
  const dirExists = await fs
    .stat(filepath)
    .then((stat) => stat.isDirectory())
    .catch(() => false)

  return dirExists
}

export default directory_exists
