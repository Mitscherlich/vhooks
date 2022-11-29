import type { DependencyList } from '@m9ch/vhooks-types'

import useEffect from '../useEffect'
import useRef from '../useRef'

export default function useMemo<T = unknown>(factory: () => T, deps?: DependencyList) {
  const memorized = useRef<T>()

  useEffect(() => {
    memorized.value = factory()
  }, deps)

  return memorized
}
