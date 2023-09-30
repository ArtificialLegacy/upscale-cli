/**
 * Type list of the id for each program state.
 */
type CliState =
  | 'esrgan_verify'
  | 'esrgan_download'
  | 'esrgan_fail'
  | 'landing_menu'
  | 'esrgan_manage'
  | 'workloads_menu'
  | 'workload_finish'
  | 'esrgan_x4'
  | 'esrgan_animex4'

export type { CliState }
