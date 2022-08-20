import { URL } from 'node:url'

import { definePredicate } from '@conduit/contract/src'
import { fold, toError, tryCatch } from 'fp-ts/Either'
import { constFalse, constTrue, pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type UrlBrand = {
  readonly Url: unique symbol
}

export const ERR_INVALID_URL = 'Invalid URL.'

const isUrl = (input: unknown) => {
  const toUrl = () => new URL(typeof input === 'string' ? input : '')
  return pipe(tryCatch(toUrl, toError), fold(constFalse, constTrue))
}

const predicate = definePredicate<string, UrlBrand>(isUrl)

const codec = t.brand(t.string, predicate, 'Url')

export const urlCodec = withMessage(codec, () => ERR_INVALID_URL)

export type Url = t.TypeOf<typeof urlCodec>
