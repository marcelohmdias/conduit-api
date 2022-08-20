import { faker } from '@faker-js/faker'
import { pipe } from 'fp-ts/function'
import { fromEither } from 'fp-ts/lib/TaskEither'
import { describe, expect, test } from 'vitest'

import { getErrorMessage, mapAll } from '@config/tests/fixtures'

import { ERR_INVALID_URL, urlCodec } from './url'

describe('scalar/url', () => {
  test('Should correctly validate the URL', () => {
    const input = faker.internet.avatar()
    pipe(
      input,
      urlCodec.decode,
      fromEither,
      mapAll((res) => expect(res).toBe(input))
    )
  })

  test('Should return a error when URL is invalid', () => {
    const input = faker.random.word()
    pipe(
      input,
      urlCodec.decode,
      fromEither,
      mapAll((err) => expect(getErrorMessage(err)).toStrictEqual(ERR_INVALID_URL))
    )
  })
})
