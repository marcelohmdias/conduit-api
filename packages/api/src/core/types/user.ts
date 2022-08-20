import type { Email } from '@core/types/scalar'

export type User = {
  email: Email
  token: string
  username: string
  bio: string
  image: string
}

export type CreateUser = {
  username: string
  email: Email
  password: string
}
