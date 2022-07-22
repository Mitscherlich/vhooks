import useRef from '../../useRef'
import type { Plugin, Timeout } from '../types'

const useRetryPlugin: Plugin<any, any[]> = (fetchInstance, { retryInterval, retryCount }) => {
  const timerRef = useRef<Timeout>()
  const countRef = useRef(0)

  const triggerByRetry = useRef(false)

  if (!retryCount)
    return {}

  return {
    onBefore: () => {
      if (!triggerByRetry.value)
        countRef.value = 0

      triggerByRetry.value = false

      if (timerRef.value)
        clearTimeout(timerRef.value)
    },
    onSuccess: () => {
      countRef.value = 0
    },
    onError: () => {
      countRef.value += 1
      if (retryCount === -1 || countRef.value <= retryCount) {
        // Exponential backoff
        const timeout = retryInterval ?? Math.min(1000 * 2 ** countRef.value, 30000)
        timerRef.value = setTimeout(() => {
          triggerByRetry.value = true
          fetchInstance.refresh()
        }, timeout)
      }
      else {
        countRef.value = 0
      }
    },
    onCancel: () => {
      countRef.value = 0
      if (timerRef.value)
        clearTimeout(timerRef.value)
    },
  }
}

export default useRetryPlugin
