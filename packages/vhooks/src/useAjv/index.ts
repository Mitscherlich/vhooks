import { isReactive, toRefs } from 'vue-demi'
import useEffect from '../useEffect'
import useMemo from '../useMemo'
import { getAjvInstance } from './ajv'

import type { Options, SchemaType } from './types'

export default function useAjv<T = unknown>(schema: SchemaType, opts?: Options) {
  const ajv = getAjvInstance<T>(opts)

  useEffect(() => {
    ajv.compile(schema)
  }, [...Object.values(isReactive(schema) ? toRefs(schema) : schema)])

  const validate = async (data: T, dataCtx?: any) => {
    return await ajv.run(data, dataCtx)
  }

  const errors = useMemo(() => {
    return ajv.compiled?.errors
  }, [ajv.signalRef])

  return { validate, errors }
}
