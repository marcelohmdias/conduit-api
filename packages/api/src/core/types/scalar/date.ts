import { definePredicate } from '@conduit/contract/src'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type DateBrand = {
  readonly Date: unique symbol
}

export const ERR_INVALID_DATE = 'Invalid date. Please use date.toISOString().'

const isDate = (value: string) => {
  return /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(value)
}

const predicate = definePredicate<string, DateBrand>(isDate)

const codec = t.brand(t.string, predicate, 'Date')

export const dateCodec = withMessage(codec, () => ERR_INVALID_DATE)

export type Date = t.TypeOf<typeof dateCodec>
