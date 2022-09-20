import type { Lazy } from 'fp-ts/function'

import type { Callable } from './functions'

export interface Adapter<A> extends Lazy<A> {}

export type Dependencies<D> = {
  [K in keyof D]: Lazy<D[K]>
}

interface Port<P, A, D = void> {
  (a: Callable<A, Dependencies<D>>): (deps: D) => P
}

export type DefinePort = <P, A, D = void>(
  p: Callable<P, Adapter<A>>
) => Port<P, A, D>
