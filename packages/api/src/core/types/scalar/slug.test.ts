import { faker } from '@faker-js/faker'
import { pipe } from 'fp-ts/function'
import { fromEither } from 'fp-ts/lib/TaskEither'
import { describe, expect, test } from 'vitest'

import { getErrorMessage, mapAll } from '@config/tests/fixtures'

import { ERR_INVALID_SLUG, slugCodec } from './slug'

const mapRight = (input: unknown) => mapAll((res) => expect(res).toBe(input))

const mapLeft = mapAll((err) => expect(getErrorMessage(err)).toBe(ERR_INVALID_SLUG))

describe('scalar/slug', () => {
  test('should validate slug properly', async () => {
    const input = faker.lorem.slug()
    return pipe(input, slugCodec.decode, fromEither, mapRight(input))()
  })

  test('Should accept 3 or more characters', async () => {
    const input = faker.random.alpha({ casing: 'lower', count: 3 })
    return pipe(input, slugCodec.decode, fromEither, mapRight(input))()
  })

  test('Should return a error when slug is invalid', async () => {
    const input = faker.lorem.sentence(5)
    return pipe(input, slugCodec.decode, fromEither, mapLeft)()
  })

  test('should not accept numbers at the beginning of the slug', async () => {
    const input = `${faker.datatype.number(9)}${faker.lorem.slug(2)}`
    return pipe(input, slugCodec.decode, fromEither, mapLeft)()
  })

  test('should not accept dashes at the end of the slug', async () => {
    const input = `${faker.lorem.slug(2)}--`
    return pipe(input, slugCodec.decode, fromEither, mapLeft)()
  })

  test('Should not accept less than 3 characters', async () => {
    const input = faker.random.alpha({ casing: 'lower', count: 2 })
    return pipe(input, slugCodec.decode, fromEither, mapLeft)()
  })
})
