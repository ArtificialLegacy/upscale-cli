import fs from 'fs/promises'

async function file_exists(filepath: string): Promise<boolean> {
  const fileExists = await fs
    .stat(filepath)
    .then((stat) => stat.isFile())
    .catch(() => false)

  return fileExists
}

export default file_exists
