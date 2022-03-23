import type {
  DeepReadonly,
  DependenciesList,
  Destroyer,
  Dispatch,
  EffectCallback,
  Reducer,
  ReturnValue,
} from '@m9ch/vhooks-types'
import { remove, toArray } from '@m9ch/vhooks-utils'
import type { UnwrapRef } from 'vue-demi'
import { ReactiveEffect, getCurrentInstance, isRef, readonly, ref, unref } from 'vue-demi'

export const useReducer = <S, A>(
  reducer: Reducer<S, A>,
  initialArg: S,
  init?: (arg: S) => S,
): ReturnValue<S, A> => {
  const state = ref<S>(initialArg)
  const dispatch: Dispatch<A> = (action) => {
    state.value = reducer(unref(state) as S, action) as UnwrapRef<S>
  }

  if (init != null) dispatch(init)

  return [readonly(state) as DeepReadonly<S>, dispatch]
}

export type BasicStateAction<S> = ((S) => S) | S

function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  // @ts-expect-error ts doesn't like mixed types
  return typeof action === 'function' ? action(state) : action
}

export const useState = <S>(initialState: (() => S) | S): [DeepReadonly<S>, Dispatch<BasicStateAction<S>>] => {
  return useReducer(basicStateReducer, initialState)
}

export const useEffect = (cb: EffectCallback, deps?: DependenciesList) => {
  let dirty = true
  let cleanup: Destroyer

  const instance = getCurrentInstance()

  const source = toArray(deps).map(dep => isRef(dep) ? dep : ref(dep))

  const runner = () => {
    if (dirty) dirty = false
    return source
  }

  const effect = new ReactiveEffect(runner, () => {
    if (!effect.active) return

    dirty = true

    // cleanup before running cb again
    if (cleanup) cleanup()

    cleanup = cb() as Destroyer
  })

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

export const useContext = () => {
  // TODO
}
