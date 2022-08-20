import type { Email } from '@core/types/scalar/email'
import type { Slug } from '@core/types/scalar/slug'
import type { Url } from '@core/types/scalar/url'

export const unsafeEmail = (value: string) => value as Email

export const unsafeSlug = (value: string) => value as Slug

export const unsafeUrl = (value: string) => value as Url
