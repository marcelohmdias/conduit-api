import { faker } from '@faker-js/faker'
import { pipe } from 'fp-ts/function'
import { describe, expect, test } from 'vitest'

import { getErrorMessage, mapAllE } from '@config/tests/fixtures'

import { ERR_INVALID_URL, urlCodec } from './url'

describe('scalar/url', () => {
  test('Should correctly validate the URL', () => {
    const input = faker.internet.avatar()
    pipe(
      input,
      urlCodec.decode,
      mapAllE((res) => expect(res).toBe(input))
    )
  })

  test('Should return a error when URL is invalid', () => {
    const input = faker.random.word()
    pipe(
      input,
      urlCodec.decode,
      mapAllE((err) => expect(getErrorMessage(err)).toStrictEqual(ERR_INVALID_URL))
    )
  })
})
