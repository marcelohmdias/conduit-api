import { Callable, definePort, resolvePort } from '@conduit/contract/src'

import type { CreateUser, User } from '@core/types/user'

type DbUserCreate = Callable<Promise<User>, CreateUser>

export const dbPort = definePort<DbUserCreate, DbUserCreate>(resolvePort)
