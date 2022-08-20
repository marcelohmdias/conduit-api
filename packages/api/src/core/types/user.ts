import * as t from 'io-ts'

import { emailCodec } from '@core/types/scalar/email'
import { urlCodec } from '@core/types/scalar/url'

export const userCodec = t.type({
  email: emailCodec,
  token: t.string,
  username: t.string,
  bio: t.string,
  image: urlCodec
})

export const createUserCodec = t.type({
  username: t.string,
  email: emailCodec,
  password: t.string
})

export type User = t.TypeOf<typeof userCodec>
export type CreateUser = t.TypeOf<typeof createUserCodec>
