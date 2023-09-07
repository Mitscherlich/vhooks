import type { DependencyList, EffectCallback } from '@m9ch/vhooks-types'
import { watch } from 'vue-demi'
import isEqual from 'lodash/isEqual'
import useRef from '../useRef'

type EffectHookType = (effect: EffectCallback, deps?: DependencyList) => void

export function createDeepCompareEffect(hook: EffectHookType) {
  return (effect: EffectCallback, deps?: DependencyList) => {
    const ref = useRef<DependencyList>()
    const signalRef = useRef(0)

    watch(deps as any[], (_deps, oldDeps) => {
      if (deps === undefined || !depsEqual(_deps, oldDeps)) {
        ref.value = oldDeps
        signalRef.value += 1
      }
    })

    return hook(effect, [signalRef])
  }
}

function depsEqual(aDeps: DependencyList = [], bDeps: DependencyList = []) {
  return isEqual(aDeps, bDeps)
}
