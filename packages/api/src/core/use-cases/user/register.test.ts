import { faker } from '@faker-js/faker'
import { pipe } from 'fp-ts/lib/function'
import { describe, expect, test } from 'vitest'

import { EXTERNAL_ERROR, mapAll, unsafeEmail, unsafeUrl } from '@config/tests/fixtures'

import { userCodec } from '@core/types/user'
import type { CreateUser } from '@core/types/user'

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
    image: unsafeUrl(faker.image.avatar()),
    token: faker.datatype.uuid(),
    bio: faker.lorem.paragraph(1)
  }
}

const registerFail = async () => {
  throw new Error(EXTERNAL_ERROR)
}

describe('use-cases/user', () => {
  test('Should register with success', async () => {
    const registerAdapter = register(registerOk)
    return pipe(
      data,
      registerAdapter(),
      mapAll((res) => expect(userCodec.is(res)).toBeTruthy())
    )()
  })

  test('Should return a Left if register function throws an error', async () => {
    const registerAdapter = register(registerFail)
    return pipe(
      data,
      registerAdapter(),
      mapAll((err) => expect(err).toStrictEqual(new Error(EXTERNAL_ERROR)))
    )()
  })
})
