import type { DependencyList, EffectCallback } from '@m9ch/vhooks-types'
import useDebounceFn from '../useDebounceFn'
import type { DebounceOptions } from '../useDebounceFn/types'
import useEffect from '../useEffect'
import useState from '../useState'
import useUpdateEffect from '../useUpdateEffect'

export default function useDebounceEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: DebounceOptions,
) {
  const [flag, setFlag] = useState({})

  const { run } = useDebounceFn(() => {
    setFlag({})
  }, options)

  useEffect(() => {
    return run()
  }, deps)

  useUpdateEffect(effect, [flag])
}
