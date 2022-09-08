import { dbPort } from '@ports/db/db'

export const dbAdapter = dbPort(() => async (data) => {
  return {
    email: data.email,
    token: undefined,
    username: data.username,
    bio: undefined,
    image: undefined
  }
})
