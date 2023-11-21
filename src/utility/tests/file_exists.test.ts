import file_exists from '../file_exists'

describe('file_exists', () => {
  it('should exist', async () => {
    const exists = await file_exists('./package.json')
    expect(exists).toBe(true)
  })

  it('shouldnt exist', async () => {
    const exists = await file_exists('./asdasdasdasd.x')
    expect(exists).toBe(false)
  })

  it('shouldnt detect directories', async () => {
    const exists = await file_exists('./src/')
    expect(exists).toBe(false)
  })
})
