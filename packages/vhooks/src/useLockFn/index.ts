import useCallback from '../useCallback'
import useRef from '../useRef'

export default function useLockFn<P extends any[] = any, V = any>(fn: (...args: P) => Promise<V>) {
  const lockRef = useRef(false)

  return useCallback(
    async (...args: P) => {
      if (lockRef.value)
        return

      lockRef.value = true
      try {
        return await fn(...args)
      }
      finally {
        lockRef.value = false
      }
    },
    [fn],
  )
}
