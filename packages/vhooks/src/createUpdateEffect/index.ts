import type { DependencyList, EffectCallback } from '@m9ch/vhooks-types'
import useRef from '../useRef'

type EffectHookType = (effect: EffectCallback, deps?: DependencyList) => void

export const createUpdateEffect = (hook: EffectHookType) => (effect: EffectCallback, deps?: DependencyList) => {
  const isMounted = useRef(false)

  // for component-refresh
  hook(() => () => {
    isMounted.value = false
  }, [])

  hook(() => {
    if (!isMounted.value)
      isMounted.value = true
    else
      return effect()
  }, deps)
}
