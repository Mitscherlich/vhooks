import type {
  DependencyList,
  Destructor,
  EffectCallback,
} from '@m9ch/vhooks-types'
import { remove, toArray } from '@m9ch/vhooks-utils'
import { ReactiveEffect, getCurrentInstance, isRef, ref } from 'vue-demi'

export const useEffect = (cb: EffectCallback, deps?: DependencyList) => {
  let dirty = true
  let cleanup: Destructor
  let effect: ReactiveEffect

  const instance = getCurrentInstance()

  const source = toArray(deps).map(dep => isRef(dep) ? dep : ref(dep))

  const runner = () => {
    if (dirty) dirty = false
    return source
  }

  const job = () => {
    if (!effect.active) return

    dirty = true

    // cleanup before running cb again
    if (cleanup) cleanup()

    cleanup = cb() as Destructor
  }

  effect = new ReactiveEffect(runner, job)

  // initial run
  if (dirty) effect.run()

  effect.onStop = () => {
    if (cleanup) cleanup()
  }

  return () => {
    effect.stop()
    if (instance && (instance as any).scope.effects)
      remove((instance as any).scope.effects, effect)
  }
}
