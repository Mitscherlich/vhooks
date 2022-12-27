import type {
  Action,
  Dispatch,
  MaybeRef,
  Reducer,
  ReturnValue,
} from '@m9ch/vhooks-types'
import type { Ref } from 'vue-demi'
import { readonly, unref } from 'vue-demi'
import useRef from '../useRef'

function useReducer<S, A extends Action<S>>(
  reducer: Reducer<S, A>,
  initialState: MaybeRef<S>,
): ReturnValue<S, A>
function useReducer<S, A extends Action<S>, I>(
  reducer: Reducer<S, A>,
  initialArgs: I,
  init: (arg: I) => S,
): ReturnValue<S, A>
function useReducer<S, A extends Action<S>, I = any>(
  reducer: Reducer<S, A>,
  initial: MaybeRef<S> | I,
  init?: (arg: I) => S,
): ReturnValue<S, A> {
  const state = useRef(
    !init ? unref(initial) as S : init(initial as I),
  )
  const dispatch: Dispatch<S, A> = (action) => {
    state.current = reducer(unref(state), action)
  }
  return [readonly(state) as Readonly<Ref<S>>, dispatch]
}

export default useReducer
