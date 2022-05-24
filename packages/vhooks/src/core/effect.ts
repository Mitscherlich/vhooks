import type {
  DependencyList,
  EffectCallback,
} from '@m9ch/vhooks-types'
import { toArray } from '@m9ch/vhooks-utils'
import {
  getCurrentScope,
  isReactive,
  isRef,
  onScopeDispose,
  queuePostFlushCb,
  shallowRef,
  watch,
} from 'vue-demi'
import type { Cleanup, Effect } from '../types'
import { argsChanged } from '../common'

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

  let source: DependencyList
  if (!deps)
    source = []
  else if (deps.some(dep => !isRef(dep) && !isReactive(dep)))
    source = toArray(deps).map(dep => !isRef(dep) && !isReactive(dep) ? shallowRef(dep) : dep)
  else
    source = toArray(deps)

  const stopWatch = watch(source, (newArgs, oldArgs) => {
    if (argsChanged(oldArgs, newArgs)) {
      invokeCleanup()
      invokeEffect()
    }
  }, { flush: 'post', deep: true })

  queuePostRenderEffect(invokeEffect)

  const stop = () => {
    stopWatch()
    invokeCleanup()
  }

  if (getCurrentScope())
    onScopeDispose(stop)

  return stop
}
