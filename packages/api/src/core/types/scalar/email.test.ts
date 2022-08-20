import { faker } from '@faker-js/faker'
import { pipe } from 'fp-ts/function'
import { describe, expect, test } from 'vitest'

import { getErrorMessage, mapAllE } from '@config/tests/fixtures'

import { emailCodec, ERR_INVALID_EMAIL } from './email'

describe('scalar/email', () => {
  test('Should correctly validate the email', () => {
    const input = faker.internet.email()
    pipe(
      input,
      emailCodec.decode,
      mapAllE((res) => expect(res).toBe(input))
    )
  })

  test('Should return a error when email is invalid', () => {
    const input = faker.random.word()
    pipe(
      input,
      emailCodec.decode,
      mapAllE((err) => expect(getErrorMessage(err)).toStrictEqual(ERR_INVALID_EMAIL))
    )
  })
})
