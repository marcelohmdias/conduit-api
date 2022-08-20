import { definePredicate } from '@conduit/contract/src'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type SlugBrand = {
  readonly Slug: unique symbol
}

export const ERR_INVALID_SLUG = 'Invalid slug. Please, use alphanumeric characters, dash and/or numbers.'

const isSlug = (value: string) => {
  /**
   * Accept:
   * - must starts with any letter;
   * - followed by a letter, a number or a dash;
   * - must ends with a letter or a number.
   */
  return /^[a-z][a-z0-9-]+?[a-z0-9]$/.test(value)
}

const predicate = definePredicate<string, SlugBrand>(isSlug)

const codec = t.brand(t.string, predicate, 'Slug')

export const slugCodec = withMessage(codec, () => ERR_INVALID_SLUG)

export type Slug = t.TypeOf<typeof slugCodec>
