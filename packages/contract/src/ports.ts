import { Lazy } from 'fp-ts/function'
import { Reader } from 'fp-ts/Reader'

type Adapter<T> = Lazy<T>

type AdapterFactory<T, U> = Reader<U, T>

type Port<T, U> = (
  adapterFactory: AdapterFactory<T, U>
) => (deps: U) => Adapter<T>

export type PortDefiner = <T, U = void>() => Port<T, U>

export type Callable<T, U = void> = U extends void ? () => T : (param: U) => T

export const definePort: PortDefiner = () => {
  return (adapterFactory) => (deps) => {
    return () => adapterFactory(deps)
  }
}
