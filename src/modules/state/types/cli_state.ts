/**
 * Type list of the id for each program state.
 */
type CliState =
  | 'esrgan_verify'
  | 'esrgan_download'
  | 'esrgan_fail'
  | 'landing_menu'
  | 'esrgan_manage'

export type { CliState }
