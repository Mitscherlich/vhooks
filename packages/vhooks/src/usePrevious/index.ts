import type { MaybeRef } from '@m9ch/vhooks-types'
import type { DeepReadonly, Ref } from 'vue-demi'
import { readonly } from 'vue-demi'
import useLatest from '../useLatest'
import useRef from '../useRef'

export type ShouldUpdateFunc<T> = (prev: T | undefined, next: T) => boolean

export default function usePrevious<T>(
  state: MaybeRef<T>,
  shouldUpdate: ShouldUpdateFunc<T> = defaultShouldUpdate,
): DeepReadonly<Ref<T | undefined>> {
  const prevRef = useRef<T>()
  const curRef = useRef<T>()

  const stateRef = useLatest(state) as Ref<T>

  if (shouldUpdate(curRef.value, stateRef.value)) {
    prevRef.value = curRef.value
    curRef.value = stateRef.value
  }

  return readonly(prevRef)
}

function defaultShouldUpdate <T>(a?: T, b?: T) {
  return !Object.is(a, b)
}

