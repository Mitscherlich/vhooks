import type {
  ReturnValue,
} from '@m9ch/vhooks-types'
import type { Ref } from 'vue-demi'
import { useReducer } from './reducer'

export type BasicStateAction<S> = ((S) => S) | S

function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  // @ts-expect-error ts doesn't like mixed types
  return typeof action === 'function' ? action(state) : action
}

/**
 * Similar to `React.useState`, but return a Vue.ref for the state.
 */
export const useState = <S>(initialState: S): ReturnValue<Ref<S>, BasicStateAction<S>> => {
  return useReducer<S, BasicStateAction<S>>(basicStateReducer, initialState)
}
