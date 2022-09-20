import express, { Request, Response } from 'express'
import { pipe } from 'fp-ts/function'
import { map, mapLeft } from 'fp-ts/TaskEither'

import { httpPort } from '@ports/http'

import { repositoryAdapter } from '@adapters/repository-in-memory'
import { register } from '@adapters/use-cases/user/register-adapter'

export const createServer = httpPort(({ env }) => {
  const app = express()

  const PORT = env().get('server.port')
  const HOST = env().get('server.host')

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  const getError = (errors: string) => {
    return {
      errors: {
        body: errors.split(':::')
      }
    }
  }

  app.post('/api/users', async (req: Request, res: Response) => {
    const { user } = req.body
    return pipe(
      user,
      register({ repository: repositoryAdapter() }),
      map((result) => res.json(result)),
      mapLeft((error) => res.status(422).json(getError(error.message)))
    )()
  })

  return {
    listen() {
      app.listen(PORT, () => {
        console.log(`⚡ Server is listening on http://${HOST}:${PORT}`)
      })
    }
  }
})
