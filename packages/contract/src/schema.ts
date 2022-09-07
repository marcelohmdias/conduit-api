import { Branded } from 'io-ts'

import { Callable } from './utils'

type Validator<T> = Callable<boolean, T>

export const definePredicate = <T, U>(validator: Validator<T>) => {
  return (value: T): value is Branded<T, U> => {
    return validator(value)
  }
}
