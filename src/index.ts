import { config as denv } from 'dotenv'
denv()

import { cli_start } from 'modules/cli'
import { state_init } from 'modules/state'

// used instead of top level await due to oddities with ts-node.
;(async () => {
  const cli = cli_start()
  const state = state_init(cli)

  state.transition('esrgan_verify')
})()

declare global {
  var __basedir: string
}
global.__basedir = __dirname
