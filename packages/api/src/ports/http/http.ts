import { definePort } from '@conduit/contract/src'

import { Env } from '@config/environments'

type Dependencies = {
  env: Env
}

type HTTPServer = {
  start: () => void
}

export const httpPort = definePort<HTTPServer, Dependencies>()
