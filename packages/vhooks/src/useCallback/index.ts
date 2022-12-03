import type { DependencyList, MaybeRef } from '@m9ch/vhooks-types'
import { unref } from 'vue-demi'
import useMemo from '../useMemo'

export default function useCallback<P extends any[] = any, R = any>(fn: MaybeRef<(...args: P) => R>, deps?: DependencyList) {
  const fnRef = useMemo(() => unref(fn), deps)

  return function (...args: P): R {
    return unref(fnRef).apply(this, args)
  }
}
