import type {
  DependencyList,
  EffectCallback,
} from '@m9ch/vhooks-types'
import { toArray } from '@m9ch/vhooks-utils'
import { reactive, watch } from 'vue-demi'
import { argsChanged } from '../common'

export interface Cleanup {
  (...args: any): void
  current?: ReturnType<EffectCallback>
}

export interface Effect {
  (...args: any): void
  current?: EffectCallback
}

export const useLayoutEffect = (fn: EffectCallback, deps?: DependencyList) => {
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

  const flushPreRender = () => {
    invokeCleanup()
    invokeEffect()
  }

  // force watch always trigger callback before each rendering
  const forceTrigger = !deps

  // hack to make sure watch callback always triggered
  if (forceTrigger) deps = [reactive({})]

  return watch(toArray(deps), (newArgs, oldArgs, cleanup) => {
    if (argsChanged(oldArgs, newArgs))
      flushPreRender()

    cleanup(invokeCleanup)
  }, { flush: 'pre' })
}
