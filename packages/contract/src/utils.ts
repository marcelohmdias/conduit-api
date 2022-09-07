export type Callable<R, P = void> = P extends void ? () => R : (param: P) => R
