import { Callable } from '@conduit/contract/src'
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

import type { Email } from '@core/types/scalar/email'
import type { Url } from '@core/types/scalar/url'

type Callback = Callable<unknown, unknown>

type MapAllE = (fn: Callback) => (data: E.Either<unknown, unknown>) => E.Either<unknown, unknown>
type MapAllTE = (fn: Callback) => (data: TE.TaskEither<unknown, unknown>) => TE.TaskEither<unknown, unknown>

export const EXTERNAL_ERROR = 'External error.'

export const getErrorMessage = (errors: unknown): string => {
  return Array.isArray(errors) ? errors[0].message : ''
}

export const mapAllE: MapAllE = (fn) => (data) => {
  return pipe(data, E.map(fn), E.mapLeft(fn))
}

export const mapAllTE: MapAllTE = (fn) => (data) => {
  return pipe(data, TE.map(fn), TE.mapLeft(fn))
}

export const unsafeEmail = (value: string) => value as Email

export const unsafeUrl = (value: string) => value as Url
