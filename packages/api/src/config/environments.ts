import convict from 'convict'

const environments = {
  app: {
    adapter: process.env.ADAPTER,
    env: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME || '',
    pid: process.pid
  },
  server: {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT || '3000', 10)
  }
}

export const env = convict(environments)

export type Env = typeof env
