import { flow } from 'fp-ts/function'

import { toAdapter, toDependencies } from './utils'
import type { Adapter, DefinePort } from './types'

/**
 * Used when the port and adapter have the same interface.
 **/
export const resolvePort = <A>(adapter: Adapter<A>): A => adapter()

/**
 * Used to specify  the pattern of de ports and adapter of a system
 **/
export const definePort: DefinePort = (portFn) => {
  return (adapterFn) => {
    return flow(toDependencies, adapterFn, toAdapter, portFn)
  }
}
