import { registerPort } from '@core/use-cases/user/register-user'

export const register = registerPort(({ repository }) => async (data) => {
  const useRepository = repository().user
  const user = await useRepository.create(data)
  return { user }
})
