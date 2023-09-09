import fs from 'fs'

function esrgan_verify(): boolean {
  const exists = fs.existsSync(`${__dirname}/../esrgan/`)

  return exists
}

export default esrgan_verify
