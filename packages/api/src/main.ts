import { env } from './config/environments'

export const main = async () => {
  const { createServer } = await import('./adapters/express/server')
  const server = createServer({ env })()

  server.start()
}

main()
