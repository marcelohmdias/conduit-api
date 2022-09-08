import * as t from 'io-ts'

import { emailCodec } from '@core/types/scalar/email'
import { passwordCodec } from '@core/types/scalar/password'
import { slugCodec } from '@core/types/scalar/slug'
import { urlCodec } from '@core/types/scalar/url'

const userRequired = t.type({
  email: emailCodec,
  username: slugCodec
})

const userPartial = t.partial({
  token: t.string,
  bio: t.string,
  image: urlCodec
})

export const userCodec = t.intersection([userRequired, userPartial])

export const createUserCodec = t.type({
  username: slugCodec,
  email: emailCodec,
  password: passwordCodec
})

export type User = t.TypeOf<typeof userCodec>
export type CreateUser = t.TypeOf<typeof createUserCodec>
