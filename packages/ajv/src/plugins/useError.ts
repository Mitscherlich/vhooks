import type Ajv from 'ajv'
import type { ErrorMessageOptions } from 'ajv-errors'
import ajvErrors from 'ajv-errors'

export function useAjvError(options?: ErrorMessageOptions) {
  return {
    name: 'errors',
    options,
    install: (ajv: Ajv, opts?: ErrorMessageOptions) => {
      return ajvErrors(ajv, {
        ...options,
        ...opts,
      })
    },
  }
}
