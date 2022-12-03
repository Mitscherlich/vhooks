import type Ajv from 'ajv'
import type { FormatOptions } from 'ajv-formats'
import ajvFormats from 'ajv-formats'

export function useAjvFormat(options?: FormatOptions) {
  return {
    name: 'formats',
    options,
    install: (ajv: Ajv, opts?: FormatOptions) => {
      return ajvFormats(ajv, {
        ...options,
        ...opts,
      })
    },
  }
}
