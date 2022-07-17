import type { MaybeRef } from '@m9ch/vhooks-types'
import { readonly, unref } from 'vue-demi'
import useRef from '../useRef'
import useUpdateEffect from '../useUpdateEffect'

export default function useLatest<T>(value: MaybeRef<T>) {
  const ref = useRef(value)

  useUpdateEffect(() => {
    ref.value = unref(value)
  }, [value])

  return readonly(ref)
}
