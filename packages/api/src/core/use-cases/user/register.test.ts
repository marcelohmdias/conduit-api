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

const registerOk: OutsideRegister = async (res) => {
  return {
    username: res.username,
    email: res.email,
    image: faker.image.avatar(),
    token: faker.datatype.uuid(),
    bio: faker.lorem.paragraph(1)
  }
}

describe('user', () => {
  test('Should register with success', async () => {
    const pipeline = pipe(
      data,
      register(registerOk)(),
      map((res) => expect(res.token).toBeDefined())
    )
    return pipeline()
  })
})
