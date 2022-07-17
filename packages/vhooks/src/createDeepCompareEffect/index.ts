import type { DependencyList, EffectCallback } from '@m9ch/vhooks-types'
import { watchEffect } from 'vue-demi'
import isEqual from 'lodash/isEqual'
import useRef from '../useRef'

type EffectHookType = (effect: EffectCallback, deps?: DependencyList) => void

export const createDeepCompareEffect = (hook: EffectHookType) => (effect: EffectCallback, deps?: DependencyList) => {
  const ref = useRef<DependencyList>()
  const signalRef = useRef(0)

  watchEffect(() => {
    if (deps === undefined || !depsEqual(deps, ref.value)) {
      ref.value = deps
      signalRef.value += 1
    }
  })

  return hook(effect, [signalRef])
}

function depsEqual(aDeps: DependencyList = [], bDeps: DependencyList = []) {
  return isEqual(aDeps, bDeps)
}
