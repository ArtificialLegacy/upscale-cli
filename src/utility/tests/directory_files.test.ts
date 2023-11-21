import directory_files from '../directory_files'

describe('directory_files', () => {
  it('should return jpg', async () => {
    const files = await directory_files('./src/utility/tests/')
    console.log('recieved: ' + files)
    expect(files).toContain('test.jpg')
  })

  it('should return png', async () => {
    const files = await directory_files('./src/utility/tests/')
    expect(files).toContain('test.png')
  })

  it('should be empty', async () => {
    const files = await directory_files('./src/utility/')
    expect(files).toEqual<never[]>([])
  })
})
