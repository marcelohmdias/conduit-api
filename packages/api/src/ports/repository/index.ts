import { Callable, definePort, resolvePort } from '@conduit/contract/src'

import type { CreateUser, User } from '@core/types/user'

export type RepositoryInstance = {
  user: {
    create: Callable<Promise<User>, CreateUser>
  }
}

export const repositoryPort = definePort<RepositoryInstance, RepositoryInstance>(resolvePort)
