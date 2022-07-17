import type { DependencyList, Fn } from '@m9ch/vhooks-types'
import useMemo from '../useMemo'

export default function useCallback<T>(fn: Fn<T>, deps?: DependencyList) {
  return useMemo(() => fn, deps)
}
