import { definePort, resolvePort } from '@conduit/contract/src'

import { Env } from '@config/environments'

type Dependencies = {
  env: Env
}

type HTTPServer = {
  listen: () => void
}

export const httpPort = definePort<HTTPServer, HTTPServer, Dependencies>(resolvePort)
