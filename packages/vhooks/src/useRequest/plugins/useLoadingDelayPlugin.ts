import useRef from '../../useRef'
import type { Plugin, Timeout } from '../types'

const useLoadingDelayPlugin: Plugin<any, any[]> = (fetchInstance, { loadingDelay }) => {
  const timerRef = useRef<Timeout>()

  if (!loadingDelay)
    return {}

  const cancelTimeout = () => {
    if (timerRef.value)
      clearTimeout(timerRef.value)
  }

  return {
    onBefore: () => {
      cancelTimeout()

      timerRef.value = setTimeout(() => {
        fetchInstance.setState({
          loading: true,
        })
      }, loadingDelay)

      return {
        loading: false,
      }
    },
    onFinally: () => {
      cancelTimeout()
    },
    onCancel: () => {
      cancelTimeout()
    },
  }
}

export default useLoadingDelayPlugin
