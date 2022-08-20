import * as t from 'io-ts'

import { slugCodec } from '@core/types/scalar/slug'
import { urlCodec } from '@core/types/scalar/url'

export const profileCodec = t.type({
  username: slugCodec,
  bio: t.string,
  image: urlCodec,
  following: t.boolean
})

export type Profile = t.TypeOf<typeof profileCodec>
