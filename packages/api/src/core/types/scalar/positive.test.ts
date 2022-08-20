import { pipe } from 'fp-ts/function'
import { fromEither } from 'fp-ts/lib/TaskEither'
import { describe, expect, test } from 'vitest'

import { getErrorMessage, mapAll } from '@config/tests/fixtures'

import { ERR_INVALID_POSITIVE, positiveCodec } from './positive'

const mapRight = (input: unknown) => mapAll((res) => expect(res).toBe(input))

describe('scalar/positive', async () => {
  test('should validate positive number correctly', () => {
    const input = 10
    return pipe(input, positiveCodec.decode, fromEither, mapRight(input))()
  })

  test('should accept zero', () => {
    const input = 0
    return pipe(input, positiveCodec.decode, fromEither, mapRight(input))()
  })

  test('should not accept a number less than zero', async () => {
    const input = -10
    return pipe(
      input,
      positiveCodec.decode,
      fromEither,
      mapAll((err) => expect(getErrorMessage(err)).toBe(ERR_INVALID_POSITIVE))
    )()
  })
})
