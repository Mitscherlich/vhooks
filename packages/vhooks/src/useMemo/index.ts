import type { DependencyList } from '@m9ch/vhooks-types'
import { readonly } from 'vue-demi'
import useRef from '../useRef'
import useUpdateEffect from '../useUpdateEffect'

export default function useMemo<T>(fn: () => T, deps?: DependencyList) {
  const memorized = useRef<T>(fn())

  useUpdateEffect(() => {
    memorized.value = fn()
  }, deps)

  return readonly(memorized)
}
