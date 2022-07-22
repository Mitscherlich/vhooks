import type { DebouncedFunc, ThrottleSettings } from 'lodash'
import throttle from 'lodash/throttle'
import useEffect from '../../useEffect'
import useRef from '../../useRef'
import type { Plugin } from '../types'

const useThrottlePlugin: Plugin<any, any[]> = (
  fetchInstance,
  { throttleWait, throttleLeading, throttleTrailing },
) => {
  const throttledRef = useRef<DebouncedFunc<any>>()

  const options: ThrottleSettings = {}
  if (throttleLeading !== undefined)
    options.leading = throttleLeading

  if (throttleTrailing !== undefined)
    options.trailing = throttleTrailing

  useEffect(() => {
    if (throttleWait) {
      const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance)

      throttledRef.value = throttle(
        (callback) => {
          callback()
        },
        throttleWait,
        options,
      )

      // throttle runAsync should be promise
      // https://github.com/lodash/lodash/issues/4400#issuecomment-834800398
      fetchInstance.runAsync = (...args) => {
        return new Promise((resolve, reject) => {
          throttledRef.value?.(() => {
            _originRunAsync(...args)
              .then(resolve)
              .catch(reject)
          })
        })
      }

      return () => {
        fetchInstance.runAsync = _originRunAsync
        throttledRef.value?.cancel()
      }
    }
  }, [throttleWait, throttleLeading, throttleTrailing])

  if (!throttleWait)
    return {}

  return {
    onCancel: () => {
      throttledRef.value?.cancel()
    },
  }
}

export default useThrottlePlugin
