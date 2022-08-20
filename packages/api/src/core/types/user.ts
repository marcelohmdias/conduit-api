import * as t from 'io-ts'

import { emailCodec } from '@core/types/scalar/email'
import { passwordCodec } from '@core/types/scalar/password'
import { slugCodec } from '@core/types/scalar/slug'
import { urlCodec } from '@core/types/scalar/url'

export const userCodec = t.type({
  email: emailCodec,
  token: t.string,
  username: slugCodec,
  bio: t.string,
  image: urlCodec
})

export const createUserCodec = t.type({
  username: slugCodec,
  email: emailCodec,
  password: passwordCodec
})

export type User = t.TypeOf<typeof userCodec>
export type CreateUser = t.TypeOf<typeof createUserCodec>
