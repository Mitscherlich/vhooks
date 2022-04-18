import type { MaybeRef } from '@m9ch/vhooks-types'
import type { Ref } from 'vue-demi'
import { customRef, unref } from 'vue-demi'

export const useResetableRef = <T>(initialValue: MaybeRef<T>): [Ref<T>, (value: MaybeRef<T>) => void] => {
  let value: T

  const ref = customRef<T>((track, trigger) => ({
    get: () => {
      track()
      return value
    },
    set: (newVal) => {
      value = newVal
      trigger()
    },
  }))

  const reset = (newVal: MaybeRef<T> = initialValue) => {
    ref.value = value = unref(newVal)
  }

  return [ref, reset]
}
