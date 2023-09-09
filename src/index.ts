import { cli_start } from './modules/cli'

// used instead of top level await due to oddities with ts-node.
;(async () => {
  const cli = cli_start()
})()
