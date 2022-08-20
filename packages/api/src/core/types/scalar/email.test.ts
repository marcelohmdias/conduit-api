import { faker } from '@faker-js/faker'
import { map, mapLeft } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { describe, expect, test } from 'vitest'

import { EmailCodec, ERR_EMAIL_INVALID } from './email'

describe('scalar/email', () => {
  test('Should correctly validate the email', () => {
    const input = faker.internet.email()
    pipe(
      input,
      EmailCodec.decode,
      map((res) => expect(res).toBe(input))
    )
  })

  test('Should return a error when email is invalid', () => {
    const input = faker.random.word()
    pipe(
      input,
      EmailCodec.decode,
      mapLeft(([err]) => expect(err?.message).toBe(ERR_EMAIL_INVALID))
    )
  })
})
