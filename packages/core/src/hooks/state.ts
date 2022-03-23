import type {
  DeepReadonly,
  Dispatch,
} from '@m9ch/vhooks-types'
import { useReducer } from './reducer'

export type BasicStateAction<S> = ((S) => S) | S

function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  // @ts-expect-error ts doesn't like mixed types
  return typeof action === 'function' ? action(state) : action
}

export const useState = <S>(initialState: S): [DeepReadonly<S>, Dispatch<BasicStateAction<S>>] => {
  return useReducer<S, BasicStateAction<S>>(basicStateReducer, initialState)
}
