import { faker } from '@faker-js/faker'
import { pipe } from 'fp-ts/lib/function'
import { describe, expect, test } from 'vitest'

import { ERR_INVALID_EMAIL } from '@src/core/types/scalar/email'
import { ERR_INVALID_PASSWORD } from '@src/core/types/scalar/password'
import { ERR_INVALID_SLUG } from '@src/core/types/scalar/slug'

import { EXTERNAL_ERROR, mapAll, unsafeEmail, unsafePassword, unsafeSlug, unsafeUrl } from '@config/tests/fixtures'

import { userCodec } from '@core/types/user'
import type { CreateUser } from '@core/types/user'

import { register } from './register-user'
import type { OutsideRegister } from './register-user'

const data: CreateUser = {
  username: unsafeSlug(faker.lorem.word(10)),
  email: unsafeEmail(faker.internet.email()),
  password: unsafePassword(faker.internet.password())
}

const dataWithWrongUsername: CreateUser = {
  username: unsafeSlug(faker.helpers.slugify(faker.random.alpha({ count: 2 }))),
  password: unsafePassword(faker.internet.password()),
  email: unsafeEmail(faker.internet.email())
}

const dataWithWrongEmailAndPassword: CreateUser = {
  username: unsafeSlug(faker.helpers.slugify(faker.name.firstName().toLowerCase())),
  password: unsafePassword(faker.internet.password(7)),
  email: unsafeEmail(faker.lorem.slug(3))
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

const mapLeft = (message: string) => {
  return mapAll((err) => expect(err).toStrictEqual(new Error(message)))
}

describe('use-cases/register-user', () => {
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
    return pipe(data, registerAdapter(), mapLeft(EXTERNAL_ERROR))()
  })

  test('Should not accept a register from a user with invalid username', async () => {
    const registerAdapter = register(registerOk)
    return pipe(dataWithWrongUsername, registerAdapter(), mapLeft(ERR_INVALID_SLUG))()
  })

  test('Should not accept a register from a user with invalid email and password', async () => {
    const registerAdapter = register(registerOk)
    return pipe(
      dataWithWrongEmailAndPassword,
      registerAdapter(),
      mapLeft(`${ERR_INVALID_EMAIL}:::${ERR_INVALID_PASSWORD}`)
    )()
  })
})
