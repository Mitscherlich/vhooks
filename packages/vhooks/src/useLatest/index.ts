import type { MaybeRef } from '@m9ch/vhooks-types'
import type { Ref } from 'vue-demi'
import { unref } from 'vue-demi'
import useRef from '../useRef'
import useUpdateEffect from '../useUpdateEffect'

export default function useLatest<T>(value: MaybeRef<T>): Ref<T> {
  const ref = useRef(value)

  useUpdateEffect(() => {
    ref.value = unref(value)
  }, [value])

  return ref
}
