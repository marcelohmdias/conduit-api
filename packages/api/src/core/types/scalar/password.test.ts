import { faker } from '@faker-js/faker'
import { pipe } from 'fp-ts/function'
import { fromEither } from 'fp-ts/lib/TaskEither'
import { describe, expect, test } from 'vitest'

import { getErrorMessage, mapAll } from '@config/tests/fixtures'

import { ERR_INVALID_PASSWORD, passwordCodec } from './password'

describe('scalar/positive', async () => {
  test('should validate password properly', () => {
    const input = faker.random.alphaNumeric(10)
    const pipeline = pipe(
      input,
      passwordCodec.decode,
      fromEither,
      mapAll((res) => expect(res).toBe(input))
    )

    pipeline()
  })

  test('should not accept a password less than eight', async () => {
    const input = faker.random.alphaNumeric(5)
    return pipe(
      input,
      passwordCodec.decode,
      fromEither,
      mapAll((err) => expect(getErrorMessage(err)).toBe(ERR_INVALID_PASSWORD))
    )()
  })
})
