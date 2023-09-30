import fs from 'fs/promises'

async function directory_exists(filepath: string): Promise<boolean> {
  const dirExists = await fs
    .stat(filepath)
    .then((stat) => stat.isDirectory())
    .catch(() => false)

  return dirExists
}

export default directory_exists
