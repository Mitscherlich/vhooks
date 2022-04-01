import type { MaybeRef } from '@m9ch/vhooks-types'
import { copy } from '@m9ch/vhooks-utils'
import type { Ref } from 'vue-demi'
import { unref, ref as useRef } from 'vue-demi'

export const useResetableRef = <T>(initialValue: MaybeRef<T>): [Ref<T>, (value?: MaybeRef<T>) => void] => {
  const ref = useRef(copy(unref(initialValue))) as Ref<T>
  const reset = (val: MaybeRef<T> = initialValue) => {
    ref.value = unref(val)
  }
  return [ref, reset]
}
