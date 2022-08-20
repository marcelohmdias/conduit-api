import { Callable } from '@conduit/contract/src'
import { Either, mapLeft } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { failure } from 'io-ts/PathReporter'

import { CreateUser, createUserCodec } from '@core/types/user'

type ValidateUser = Callable<Either<Error, CreateUser>, CreateUser>

export const validateUser: ValidateUser = (data) => {
  return pipe(
    createUserCodec.decode(data),
    mapLeft((errors) => new Error(failure(errors).join(':::')))
  )
}
