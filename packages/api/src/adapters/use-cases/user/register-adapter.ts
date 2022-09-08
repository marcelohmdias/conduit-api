import { registerPort } from '@core/use-cases/user/register-user'

export const register = registerPort(({ db }) => async (data) => {
  const user = await db(data)
  return { user }
})
