import type {
  DependencyList,
  EffectCallback,
} from '@m9ch/vhooks-types'
import { toArray } from '@m9ch/vhooks-utils'
import { queuePostFlushCb, watch } from 'vue-demi'
import { argsChanged } from '../common'

export interface Cleanup {
  (...args: any): void
  current?: ReturnType<EffectCallback>
}

export interface Effect {
  (...args: any): void
  current?: EffectCallback
}

const queuePostRenderEffect = queuePostFlushCb

export const useEffect = (fn: EffectCallback, deps?: DependencyList) => {
  const invokeCleanup: Cleanup = () => {
    const { current } = invokeCleanup
    if (current) {
      current()
      invokeCleanup.current = null
    }
  }

  const invokeEffect: Effect = () => {
    const { current } = invokeEffect
    if (current) {
      invokeCleanup.current = current()
      invokeEffect.current = fn
    }
  }

  invokeEffect.current = fn

  const stop = watch(deps ? toArray(deps) : [], (newArgs, oldArgs, cleanup) => {
    if (argsChanged(oldArgs, newArgs)) {
      invokeCleanup()
      invokeEffect()
    }

    cleanup(invokeCleanup)
  }, { flush: 'post', deep: true })

  queuePostRenderEffect(invokeEffect)

  return stop
}
