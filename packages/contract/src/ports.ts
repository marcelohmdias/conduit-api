import { constant, pipe } from 'fp-ts/function'
import type { Lazy } from 'fp-ts/function'
import type { Traced } from 'fp-ts/Traced'

import type { Callable } from './utils'

interface Adapter<A> extends Lazy<A> {}

interface Port<P, A, D> extends Traced<Callable<A, D>, (d: D) => P> {}

export type DefinePort = <P, A, D = void>(
  p: Callable<P, Adapter<A>>
) => Port<P, A, D>

const toAdapter = <A>(adapter: A): Adapter<A> => constant(adapter)

/**
 * Used when the port and adapter have the same interface.
 **/
export const resolvePort = <A>(adapter: Adapter<A>): A => adapter()

/**
 * Used to specify  the pattern of de ports and adapter of a system
 **/
export const definePort: DefinePort = (portFn) => {
  return (adapterFn) => {
    return (deps) => {
      return pipe(deps, adapterFn, toAdapter, portFn)
    }
  }
}
