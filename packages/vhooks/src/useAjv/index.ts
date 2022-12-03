import type { Options, Plugin } from './types'
import { useAjvImplement } from './useAjv'
import { useAjvError } from './plugins/useError'
import { useAjvFormat } from './plugins/useFormat'

export default function useAjv<TData, TSchema = any>(
  schema: TSchema,
  options?: Options,
  plugins?: Plugin[],
) {
  return useAjvImplement<TData, TSchema>(schema, options, [
    ...(plugins || []),
    useAjvError(),
    useAjvFormat(),
  ])
}
