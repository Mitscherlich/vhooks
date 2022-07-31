import type { MaybeRef } from '@m9ch/vhooks-types'
import useLatest from '../useLatest'
import useRef from '../useRef'

export default function useLockFn<P extends any[] = any, V = any>(fn: MaybeRef<(...args: P) => Promise<V>>) {
  const lockRef = useRef(false)
  const fnRef = useLatest(fn)

  return async (...args: P) => {
    const fn = fnRef.value
    if (!fn || lockRef.value)
      return

    lockRef.value = true
    try {
      return await fn(...args)
    }
    finally {
      lockRef.value = false
    }
  }
}
