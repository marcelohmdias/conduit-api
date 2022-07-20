import { faker } from '@faker-js/faker'
import { pipe } from 'fp-ts/lib/function'
import { map } from 'fp-ts/lib/TaskEither'
import { describe, expect, test } from 'vitest'

import type { CreateUser } from '@core/types/user'

import { register } from './register'
import type { OutsideRegister } from './register'

const data: CreateUser = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

const registerOk: OutsideRegister<string> = async (res) => {
  return `User ${res.username} registered with success!`
}

describe('user', () => {
  test('Should register with success', async () => {
    const pipeline = pipe(
      data,
      register(registerOk),
      map((res) => expect(res).toBe(`User ${data.username} registered with success!`))
    )
    return pipeline()
  })
})
