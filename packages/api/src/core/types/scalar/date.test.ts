import { faker } from '@faker-js/faker'
import { pipe } from 'fp-ts/function'
import { describe, expect, test } from 'vitest'

import { getErrorMessage, mapAllE } from '@config/tests/fixtures'

import { dateCodec, ERR_INVALID_DATE } from './date'

describe('scalar/date', () => {
  test('should validate date correctly', () => {
    const input = faker.datatype.datetime().toISOString()
    pipe(
      input,
      dateCodec.decode,
      mapAllE((res) => expect(res).toBe(input))
    )
  })

  test('should not accept a string different from date ISOString', () => {
    const date = faker.datatype.datetime()
    const input = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    pipe(
      input,
      dateCodec.decode,
      mapAllE((err) => expect(getErrorMessage(err)).toStrictEqual(ERR_INVALID_DATE))
    )
  })
})
