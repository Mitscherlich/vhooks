import type {
  DependencyList,
  EffectCallback,
} from '@m9ch/vhooks-types'
import { run, toArray } from '@m9ch/vhooks-utils'
import { isRef, onMounted, onUnmounted, ref, watch } from 'vue-demi'

export const useEffect = (rawEffect: EffectCallback, deps?: DependencyList) => {
  const cleanup: any = () => {
    const { current } = cleanup
    if (current) {
      current()
      cleanup.current = null
    }
  }
  const effect: any = () => {
    const { current } = effect
    if (current) {
      cleanup.current = current()
      effect.current = null
    }
  }
  effect.current = rawEffect

  onMounted(effect)
  onUnmounted(cleanup)
  if (!deps || deps.length > 0) {
    const source = toArray(deps).map(d => isRef(d) ? d : ref(d))
    watch(source, run(cleanup, effect))
  }
}
