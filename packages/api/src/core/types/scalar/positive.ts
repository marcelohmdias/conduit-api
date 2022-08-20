import { definePredicate } from '@conduit/contract/src'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type PositiveBrand = {
  readonly Positive: unique symbol
}

export const ERR_INVALID_POSITIVE = 'Invalid number. This number should be greater than zero.'

const isPositive = (value: number) => value >= 0

const predicate = definePredicate<number, PositiveBrand>(isPositive)

const codec = t.brand(t.number, predicate, 'Positive')

export const positiveCodec = withMessage(codec, () => ERR_INVALID_POSITIVE)

export type Positive = t.TypeOf<typeof positiveCodec>
