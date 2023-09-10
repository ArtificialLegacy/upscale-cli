import { State } from '../../state_machine'

/**
 * The program state for downloading esrgan.
 */
const esrgan_download = new State((_, cli) => {
  cli.print('test')
})

export default esrgan_download
