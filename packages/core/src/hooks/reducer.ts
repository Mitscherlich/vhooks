import type {
  DeepReadonly,
  Dispatch,
  Reducer,
  ReturnValue,
} from '@m9ch/vhooks-types'
import type { UnwrapRef } from 'vue-demi'
import { readonly, ref, unref } from 'vue-demi'

export const useReducer = <S, A>(
  reducer: Reducer<S, A>,
  initialArg: S,
  init?: A,
): ReturnValue<S, A> => {
  const state = ref<S>(initialArg)
  const dispatch: Dispatch<A> = (action) => {
    state.value = reducer(unref(state) as S, action) as UnwrapRef<S>
  }

  if (init != null) dispatch(init)

  return [readonly(state) as DeepReadonly<S>, dispatch]
}
