import { config as denv } from 'dotenv'
denv()

import { state_init } from 'modules/state'

const state = state_init()
state.transition('esrgan_verify')

declare global {
  var __basedir: string
}
global.__basedir = __dirname
