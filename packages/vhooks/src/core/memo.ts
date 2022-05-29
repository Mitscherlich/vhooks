import type { Ref } from 'vue-demi'
import { customRef, effect } from 'vue-demi'
import type { DeepReadonly } from '@m9ch/vhooks-types'

/**
 * Similar to `React.useMemo`, but return a Vue.ref for the state.
 */
export const useMemo = <T>(fn: () => T, deps?: any[]): DeepReadonly<Ref<T>> => {
  let value: T
  let dirty = true

  const runner = effect(() => deps ? [fn(), ...deps] : [fn()], {
    lazy: true,
    scheduler: () => {
      dirty = true // deps changed
    },
  })

  return customRef(track => ({
    get: () => {
      track()
      if (dirty) {
        [value] = runner()
        dirty = false
      }
      return value
    },
    set: () => {
      if (process.env.NODE_ENV === 'development')
        console.warn('Write operation failed: useMemo is readonly')
    },
  }))
}
