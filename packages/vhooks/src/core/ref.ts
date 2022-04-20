import type { Ref } from 'vue-demi'
import { customRef, isRef, ref } from 'vue-demi'
import type { MaybeRef } from '@m9ch/vhooks-types'

/**
 * An alias version of Vue.ref
 */
export const useRef = <T>(value?: MaybeRef<T>): Ref<T> => isRef<T>(value)
  ? ref<Ref<T>>(value)
  : customRef<T>((track, trigger) => ({
    get: () => {
      track()
      return value as T
    },
    set: (newVal) => {
      value = newVal
      trigger()
    },
  }))
