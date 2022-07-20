import { toError } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { tryCatch } from 'fp-ts/TaskEither'
import type { TaskEither } from 'fp-ts/TaskEither'

import { CreateUser } from '@core/types/user'

export type OutsideRegister<T> = (data: CreateUser) => Promise<T>

type Register = <T>(outsideRegister: OutsideRegister<T>) => (data: CreateUser) => TaskEither<Error, T>

export const register: Register = (outsideRegister) => (data) => {
  return pipe(tryCatch(() => outsideRegister(data), toError))
}
