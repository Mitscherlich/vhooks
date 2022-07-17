import type { DependencyList, EffectCallback } from '@m9ch/vhooks-types'
import useThrottleFn from '../useThrottleFn'
import type { ThrottleOptions } from '../useThrottleFn/types'
import useEffect from '../useEffect'
import useState from '../useState'
import useUpdateEffect from '../useUpdateEffect'

export default function useThrottleEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: ThrottleOptions,
) {
  const [flag, setFlag] = useState({})

  const { run } = useThrottleFn(() => {
    setFlag({})
  }, options)

  useEffect(() => {
    return run()
  }, deps)

  useUpdateEffect(effect, [flag])
}
