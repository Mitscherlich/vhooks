import type { Ref } from 'vue-demi'
import { customRef, unref } from 'vue-demi'
import type { MaybeRef } from '@m9ch/vhooks-types'

export default function useRef <T>(initialValue?: MaybeRef<T>): Ref<T> {
  // auto unwrap ref
  let current = unref(initialValue)

  return customRef((track, trigger) => ({
    get: () => {
      track()
      return current
    },
    set: (newVal) => {
      trigger()
      current = newVal
    },
  }))
}
