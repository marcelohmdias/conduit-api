import { definePredicate } from '@conduit/contract/src'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type PasswordBrand = {
  readonly Password: unique symbol
}

export const ERR_INVALID_PASSWORD = 'Invalid password. Password should be at least 8 characters.'

const isPassword = (value: string) => value.length >= 8

const predicate = definePredicate<string, PasswordBrand>(isPassword)

const codec = t.brand(t.string, predicate, 'Password')

export const passwordCodec = withMessage(codec, () => ERR_INVALID_PASSWORD)

export type Password = t.TypeOf<typeof passwordCodec>
