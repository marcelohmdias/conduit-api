import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type EmailBrand = {
  readonly Email: unique symbol
}

export const ERR_EMAIL_INVALID = 'Invalid email'

export const isEmail = (value: string) => /^\w+.+?@\w+.+?$/.test(value)

export const emailGuard = (value: string): value is t.Branded<string, EmailBrand> => isEmail(value)

export const codec = t.brand(t.string, emailGuard, 'Email')

export const EmailCodec = withMessage(codec, () => ERR_EMAIL_INVALID)

export type Email = t.TypeOf<typeof EmailCodec>
