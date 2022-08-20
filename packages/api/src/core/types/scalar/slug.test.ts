import { faker } from '@faker-js/faker'
import { pipe } from 'fp-ts/function'
import { describe, expect, test } from 'vitest'

import { getErrorMessage, mapAllE } from '@config/tests/fixtures'

import { ERR_INVALID_SLUG, slugCodec } from './slug'

const mapRight = (input: unknown) => mapAllE((res) => expect(res).toBe(input))

const mapLeft = mapAllE((err) => expect(getErrorMessage(err)).toStrictEqual(ERR_INVALID_SLUG))

describe('scalar/slug', () => {
  test('should validate slug properly', () => {
    const input = faker.lorem.slug()
    pipe(input, slugCodec.decode, mapRight(input))
  })

  test('Should accept 3 or more characters', () => {
    const input = faker.random.alpha({ casing: 'lower', count: 3 })
    pipe(input, slugCodec.decode, mapRight(input))
  })

  test('Should return a error when slug is invalid', () => {
    const input = faker.lorem.sentence(5)
    pipe(input, slugCodec.decode, mapLeft)
  })

  test('should not accept numbers at the beginning of the slug', () => {
    const input = `${faker.datatype.number(9)}${faker.lorem.slug(2)}`
    pipe(input, slugCodec.decode, mapLeft)
  })

  test('should not accept dashes at the end of the slug', () => {
    const input = `${faker.lorem.slug(2)}--`
    pipe(input, slugCodec.decode, mapLeft)
  })

  test('Should not accept less than 3 characters', () => {
    const input = faker.random.alpha({ casing: 'lower', count: 2 })
    pipe(input, slugCodec.decode, mapLeft)
  })
})
