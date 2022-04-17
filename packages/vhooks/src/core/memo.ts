import { effect } from 'vue-demi'
import type { DeepReadonly } from '@m9ch/vhooks-types'

export const useMemo = <T>(fn: () => T, deps: any[] = []): DeepReadonly<{ value: T }> => {
  let value: any
  let dirty = true

  const runner = effect(() => deps, {
    lazy: true,
    scheduler: () => {
      dirty = true // deps changed
      value = fn()
    },
  })

  return {
    get value() {
      if (dirty) {
        runner()
        dirty = false
      }
      return value
    },
  }
}
