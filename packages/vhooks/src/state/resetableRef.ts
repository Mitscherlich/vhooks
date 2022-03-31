import type { MaybeRef } from '@m9ch/vhooks-types'
import type { Ref } from 'vue-demi'
import { unref, ref as useRef } from 'vue-demi'

export const useResetableRef = <T>(initialValue: MaybeRef<T>): [Ref<T>, (value?: T) => void] => {
  const ref = useRef(unref(initialValue)) as Ref<T>
  const reset = (val?: T) => {
    ref.value = unref(val ?? initialValue) as T
  }
  return [ref, reset]
}
