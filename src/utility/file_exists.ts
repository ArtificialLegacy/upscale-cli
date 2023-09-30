import fs from 'fs/promises'

/**
 * Check if a file exists.
 * @param filepath - The path to the file to check.
 * @returns A promise that resolves to true if the file exists, false otherwise.
 */
async function file_exists(filepath: string): Promise<boolean> {
  const fileExists = await fs
    .stat(filepath)
    .then((stat) => stat.isFile())
    .catch(() => false)

  return fileExists
}

export default file_exists
