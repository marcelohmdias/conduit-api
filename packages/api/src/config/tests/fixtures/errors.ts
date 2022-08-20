export const EXTERNAL_ERROR = 'External error.'

export const getErrorMessage = (errors: unknown): string => {
  return Array.isArray(errors) ? errors[0].message : ''
}
