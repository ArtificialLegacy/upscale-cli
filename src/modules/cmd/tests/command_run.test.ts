import command_run from '../command_run'

describe('command_run', () => {
  it('should return 0', async () => {
    const result = await command_run('echo 0')
    expect(result).toEqual(0)
  })

  it('should error', async () => {
    const result = await command_run('dfgdfggre')
      .then(() => 0)
      .catch(() => 1)
    expect(result).toEqual(1)
  })

  it('should exit with code 1', async () => {
    const result = await command_run('exit 1')
      .then(() => 0)
      .catch((code) => code)
    expect(result).toEqual(1)
  })
})
