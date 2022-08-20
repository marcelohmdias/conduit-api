import { faker } from '@faker-js/faker'
import { pipe } from 'fp-ts/lib/function'
import { map } from 'fp-ts/lib/TaskEither'
import { describe, expect, test } from 'vitest'

import type { CreateUser } from '@core/types'

import { unsafeEmail } from '../../../config/tests/fixtures'
import { register } from './register'
import type { OutsideRegister } from './register'

const data: CreateUser = {
  username: faker.internet.userName(),
  email: unsafeEmail(faker.internet.email()),
  password: faker.internet.password()
}

const registerOk: OutsideRegister = async (res) => {
  return {
    username: res.username,
    email: res.email,
    image: faker.image.avatar(),
    token: faker.datatype.uuid(),
    bio: faker.lorem.paragraph(1)
  }
}

describe('use-cases/user', () => {
  test('Should register with success', async () => {
    const registerAdapter = register(registerOk)
    const pipeline = pipe(
      data,
      registerAdapter(),
      map((res) => expect(res.token).toBeDefined())
    )
    return pipeline()
  })
})
