import type {
  DeepReadonly,
  Dispatch,
  Reducer,
  ReturnValue,
} from '@m9ch/vhooks-types'
import type { Ref, UnwrapRef } from 'vue-demi'
import { readonly, ref, unref } from 'vue-demi'

export default function useReducer<S, A>(
  reducer: Reducer<S, A>,
  initialArg: S,
  init?: A,
): ReturnValue<Ref<S>, A> {
  const state = ref<S>(initialArg)
  const dispatch: Dispatch<A> = (action) => {
    state.value = reducer(unref(state) as S, action) as UnwrapRef<S>
  }

  if (init != null)
    dispatch(init)

  return [readonly(state) as DeepReadonly<Ref<S>>, dispatch]
}
