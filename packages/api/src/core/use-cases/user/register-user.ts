import { Callable, definePort } from '@conduit/contract/src'
import { toError } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { chain, fromEither, tryCatch } from 'fp-ts/TaskEither'
import type { TaskEither } from 'fp-ts/TaskEither'

import type { CreateUser, User } from '@core/types/user'

import { validateUser } from './validate-user'

export type RegisterUser = Callable<TaskEither<Error, User>, CreateUser>
export type OutsideRegister = Callable<Promise<User>, CreateUser>

const registerPort = definePort<RegisterUser, OutsideRegister>()

export const register = registerPort((outsideRegister) => (data) => {
  const doRegister = (userData: CreateUser) => {
    return tryCatch(() => outsideRegister(userData), toError)
  }
  return pipe(data, validateUser, fromEither, chain(doRegister))
})
