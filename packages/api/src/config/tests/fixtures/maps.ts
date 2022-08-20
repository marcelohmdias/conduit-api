import { Callable } from '@conduit/contract/src'
import { pipe } from 'fp-ts/function'
import { map, mapLeft, TaskEither } from 'fp-ts/lib/TaskEither'

type Callback = Callable<unknown, unknown>

type MapAll = (fn: Callback) => (data: TaskEither<unknown, unknown>) => TaskEither<unknown, unknown>

export const mapAll: MapAll = (fn) => (data) => {
  return pipe(data, map(fn), mapLeft(fn))
}
