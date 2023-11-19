import directory_exists from '../directory_exists'

describe('directory_exists', () => {
  it('should exist', async () => {
    const exists = await directory_exists('./src/')
    expect(exists).toBe(true)
  })

  it('shouldnt exist', async () => {
    const exists = await directory_exists('./asdasdasdasd.x')
    expect(exists).toBe(false)
  })

  it('shouldnt detect files', async () => {
    const exists = await directory_exists('./package.json')
    expect(exists).toBe(false)
  })
})
