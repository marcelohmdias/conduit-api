import * as t from 'io-ts'

import { profileCodec } from '@core/types/profile'
import { dateCodec } from '@core/types/scalar/date'
import { slugCodec } from '@core/types/scalar/slug'
import { tagCodec } from '@core/types/tag'

export const articleCodec = t.type({
  slug: slugCodec,
  title: t.string,
  description: t.string,
  body: t.string,
  tagList: t.array(tagCodec),
  createdAt: dateCodec,
  updatedAt: dateCodec,
  favorited: t.boolean,
  favoritesCount: t.number,
  author: profileCodec
})

export const articlesCodec = t.type({
  articles: t.array(articleCodec),
  articlesCount: t.number
})

export type Article = t.TypeOf<typeof articleCodec>
export type Articles = t.TypeOf<typeof articlesCodec>
