import { faker } from '@faker-js/faker'
import { pipe } from 'fp-ts/function'
import { fromEither } from 'fp-ts/TaskEither'
import { describe, expect, test } from 'vitest'

import { getErrorMessage, mapAll } from '@config/tests/fixtures'

import { dateCodec, ERR_INVALID_DATE } from './date'

describe('scalar/date', () => {
  test('should validate date correctly', async () => {
    const input = faker.datatype.datetime().toISOString()
    return pipe(
      input,
      dateCodec.decode,
      fromEither,
      mapAll((res) => expect(res).toBe(input))
    )()
  })

  test('should not accept a string different from date ISOString', async () => {
    const date = faker.datatype.datetime()
    const input = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    return pipe(
      input,
      dateCodec.decode,
      fromEither,
      mapAll((err) => expect(getErrorMessage(err)).toBe(ERR_INVALID_DATE))
    )()
  })
})
