import useRef from '../../useRef'
import useUpdateEffect from '../../useUpdateEffect'
import type { Plugin, Timeout } from '../types'
import isDocumentVisible from '../utils/isDocumentVisible'
import subscribeReVisible from '../utils/subscribeReVisible'

const usePollingPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { pollingInterval, pollingWhenHidden = true, pollingErrorRetryCount = -1 },
) => {
  const timerRef = useRef<Timeout>()
  const unsubscribeRef = useRef<() => void>()
  const countRef = useRef<number>(0)

  const stopPolling = () => {
    if (timerRef.value)
      clearTimeout(timerRef.value)

    unsubscribeRef.value?.()
  }

  useUpdateEffect(() => {
    if (!pollingInterval)
      stopPolling()
  }, [pollingInterval])

  if (!pollingInterval)
    return {}

  return {
    onBefore: () => {
      stopPolling()
    },
    onError: () => {
      countRef.value += 1
    },
    onSuccess: () => {
      countRef.value = 0
    },
    onFinally: () => {
      if (
        pollingErrorRetryCount === -1
        // When an error occurs, the request is not repeated after pollingErrorRetryCount retries
        || (pollingErrorRetryCount !== -1 && countRef.value <= pollingErrorRetryCount)
      ) {
        // if pollingWhenHidden = false && document is hidden, then stop polling and subscribe revisible
        if (!pollingWhenHidden && !isDocumentVisible()) {
          unsubscribeRef.value = subscribeReVisible(() => {
            fetchInstance.refresh()
          })
          return
        }

        timerRef.value = setTimeout(() => {
          fetchInstance.refresh()
        }, pollingInterval)
      }
      else {
        countRef.value = 0
      }
    },
    onCancel: () => {
      stopPolling()
    },
  }
}

export default usePollingPlugin
