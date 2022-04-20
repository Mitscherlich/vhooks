import type { MaybeRef } from '@m9ch/vhooks-types'
import type { Ref } from 'vue-demi'
import { customRef, isRef, unref } from 'vue-demi'

/**
 * A hooks create resetable ref
 *
 * Example:
 *
 * ```tsx
 * import { useResetableRef } from '@m9ch/vhooks'
 * import { defineComponent } from 'vue'
 *
 * const [count, reset] = useResetableRef(0)
 *
 * const App = defineComponent(() => {
 *   onMounted(() => {
 *     count.value++
 *   })
 *
 *   onBeforeUnmount(() => {
 *     reset()
 *   })
 *
 *   return () => <div>{count.value}</div>
 * })
 * ```
 */
export const useResetableRef = <T>(initialValue: MaybeRef<T>): [Ref<T>, (value?: MaybeRef<T>) => void] => {
  let value: T = isRef<T>(initialValue) ? unref(initialValue) : initialValue as T

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
    ref.value = value = isRef<T>(newVal) ? unref<T>(newVal) : newVal as T
  }

  return [ref, reset]
}
