import type { Ref } from 'vue-demi'
import { customRef, unref } from 'vue-demi'
import type { MaybeRef } from '@m9ch/vhooks-types'

/**
 * similar to `React.useRef`, but returns `Vue.ref`
 */
export const useRef = <T>(initialValue?: MaybeRef<T>): Ref<T> => customRef((track, trigger) => {
  // auto unwrap ref
  let current = unref(initialValue)

  return {
    get: () => {
      track()
      return current
    },
    set: (newVal) => {
      trigger()
      current = newVal
    },
  }
})
