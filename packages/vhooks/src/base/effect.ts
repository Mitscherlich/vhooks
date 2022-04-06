import type {
  DependencyList,
  EffectCallback,
} from '@m9ch/vhooks-types'
import { fn, toArray } from '@m9ch/vhooks-utils'
import { getCurrentInstance, onBeforeUnmount, onMounted, watch } from 'vue-demi'

interface Cleanup {
  (...args: any): void
  current?: ReturnType<EffectCallback>
}

interface Effect {
  (...args: any): void
  current?: EffectCallback
}

export const useEffect = (rawEffect: EffectCallback, deps: DependencyList = []) => {
  const cleanup: Cleanup = () => {
    const { current } = cleanup
    if (current) {
      current()
      cleanup.current = null
    }
  }

  const effect: Effect = () => {
    const { current } = effect
    if (current) {
      cleanup.current = current()
      effect.current = null
    }
  }

  effect.current = rawEffect

  const source = () => toArray(deps)

  const stopWatch = watch(source, fn.pipe(cleanup, effect, () => {
    effect.current = rawEffect
  }), { flush: 'sync' })

  if (getCurrentInstance()) {
    onMounted(effect)
    onBeforeUnmount(fn.pipe<void>(stopWatch, cleanup))
  }
  else { effect() }
}
