import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type EmailBrand = {
  readonly Email: unique symbol
}

export const ERR_INVALID_EMAIL = 'Invalid email.'

export const isEmail = (value: string) => /^\w+.+?@\w+.+?$/.test(value)

const predicate = (value: string): value is t.Branded<string, EmailBrand> => isEmail(value)

const codec = t.brand(t.string, predicate, 'Email')

export const emailCodec = withMessage(codec, () => ERR_INVALID_EMAIL)

export type Email = t.TypeOf<typeof emailCodec>
