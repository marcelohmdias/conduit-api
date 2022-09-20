import { RepositoryInstance, repositoryPort } from '@ports/repository'

const user: RepositoryInstance['user'] = {
  create: async (data) => {
    return {
      email: data.email,
      token: undefined,
      username: data.username,
      bio: undefined,
      image: undefined
    }
  }
}

export const repositoryAdapter = repositoryPort(() => {
  return {
    user
  }
})
