import { env } from './config/environments'

export const main = async () => {
  const { createServer } = await import('./adapters/express/server')
  const http = createServer({ env })

  http.listen()
}

main()
