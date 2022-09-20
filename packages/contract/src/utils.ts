import { constant, pipe } from 'fp-ts/function'

import type { Adapter, Dependencies } from './types'

const entries = Object.entries
const fromEntries = Object.fromEntries

export const toAdapter = <A>(adapter: A): Adapter<A> => constant(adapter)

export function toDependencies<D>(): Dependencies<D> {
  const deps = arguments?.[0] || {}
  return pipe(
    deps,
    entries,
    (list = []) => list.map(([key, fn]) => [key, constant(fn)]),
    fromEntries
  )
}
