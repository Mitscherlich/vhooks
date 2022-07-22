import { onUnmounted } from 'vue-demi'
import useEffect from '../../useEffect'
import useRef from '../../useRef'
import type { Plugin } from '../types'
import limit from '../utils/limit'
import subscribeFocus from '../utils/subscribeFocus'

const useRefreshOnWindowFocusPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { refreshOnWindowFocus, focusTimespan = 5000 },
) => {
  const unsubscribeRef = useRef<() => void>()

  const stopSubscribe = () => {
    unsubscribeRef.value?.()
  }

  useEffect(() => {
    if (refreshOnWindowFocus) {
      const limitRefresh = limit(fetchInstance.refresh.bind(fetchInstance), focusTimespan)
      unsubscribeRef.value = subscribeFocus(() => {
        limitRefresh()
      })
    }
    return () => {
      stopSubscribe()
    }
  }, [refreshOnWindowFocus, focusTimespan])

  onUnmounted(() => {
    stopSubscribe()
  })

  return {}
}

export default useRefreshOnWindowFocusPlugin
