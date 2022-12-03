import { readonly, toRefs } from 'vue-demi'
import useUpdate from '../useUpdate'
import AjvInstance from './Ajv'
import type { Options, Plugin, Result, SchemaObject } from './types'

export function useAjvImplement<TData, TSchema>(
  schema: SchemaObject,
  options: Options = {},
  plugins: Plugin[] = [],
) {
  const { pluginOpts = {} } = options

  const update = useUpdate()
  const ajvInstance = (() => {
    return new AjvInstance<TData, TSchema>(schema, options, update)
  })()
  ajvInstance.schema = schema
  plugins.forEach((plugin) => {
    ajvInstance.use(plugin, pluginOpts[plugin.name])
  })

  const { status, errors, data } = toRefs(ajvInstance.state)

  return {
    status: readonly(status),
    errors: readonly(errors),
    data: readonly(data),
    compile: ajvInstance.compile.bind(ajvInstance),
    compileAsync: ajvInstance.compileAsync.bind(ajvInstance),
    run: ajvInstance.run.bind(ajvInstance),
  } as unknown as Result<TData, TSchema>
}
