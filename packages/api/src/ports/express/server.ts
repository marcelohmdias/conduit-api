import express, { Request, Response } from 'express'
import { pipe } from 'fp-ts/function'
import { map, mapLeft } from 'fp-ts/TaskEither'

import { config } from '@config/environments'

import { register } from '@adapters/user/register-adapter'

const app = express()

const PORT = config.get('server.port')
const HOST = config.get('server.host')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const getError = (errors: string) => {
  return {
    errors: {
      body: errors.split(':::')
    }
  }
}

const outsideRegister = async (data: any) => {
  return {
    success: true,
    user: data
  }
}

app.post('/api/users', async (req: Request, res: Response) => {
  const { user } = req.body
  return pipe(
    user,
    register(outsideRegister)(),
    map((result) => res.json(result)),
    mapLeft((error) => res.status(422).json(getError(error.message)))
  )()
})

app.listen(PORT, () => {
  console.log(`⚡ Server is listening on http://${HOST}:${PORT}`)
})
