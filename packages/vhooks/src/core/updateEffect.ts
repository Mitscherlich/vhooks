import type {
  DependencyList,
  EffectCallback,
} from '@m9ch/vhooks-types'
import { useEffect } from './effect'

export const useUpdateEffect = (fn: EffectCallback, deps?: DependencyList) => {
  let isMounted = false

  useEffect(() => {
    isMounted = true
  }, [])

  useEffect(() => {
    if (!isMounted)
      isMounted = true
    else
      return fn()
  }, deps)
}
