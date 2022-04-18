import type { Ref } from 'vue-demi'
import { customRef, isRef, ref, unref } from 'vue-demi'
import type { MaybeRef } from '@m9ch/vhooks-types'

export const useRef = <T>(value?: MaybeRef<T>): Ref<T> => isRef(value)
  ? ref(unref(value)) as Ref<T>
  : customRef<T>((track, trigger) => ({
    get: () => {
      track()
      return unref(value)
    },
    set: (newVal) => {
      value = newVal
      trigger()
    },
  }))
