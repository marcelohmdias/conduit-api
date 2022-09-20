export type Callable<T, U = void> = U extends void ? () => T : (param: U) => T
