import { Callable, definePort } from '@conduit/contract/src'
import { toError } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { chain, fromEither, tryCatch } from 'fp-ts/TaskEither'
import type { TaskEither } from 'fp-ts/TaskEither'

import type { CreateUser, User } from '@core/types/user'

import { validateUser } from './validate-user'
type Data = {
  user: User
}
export type RegisterUser = Callable<TaskEither<Error, Data>, CreateUser>
export type OutsideRegister = Callable<Promise<Data>, CreateUser>
export type Dependencies = {
  db: Callable<Promise<User>, CreateUser>
}

export const registerPort = definePort<RegisterUser, OutsideRegister, Dependencies>((outsideRegister) => {
  return (data) => {
    const doRegister = (userData: CreateUser) => {
      return tryCatch(() => outsideRegister()(userData), toError)
    }
    return pipe(data, validateUser, fromEither, chain(doRegister))
  }
})
