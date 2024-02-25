import type {
  Action,
  MaybeRef,
  ReturnValue,
} from '@m9ch/vhooks-types'
import useReducer from '../useReducer'

export type BasicStateAction<S> = Action<S>

function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  return typeof action === 'function' ? (action as (s: S) => S)(state) : action
}

function useState<S>(initialState: MaybeRef<S>): ReturnValue<S, BasicStateAction<S>>
function useState<S>(initialState: (s: S) => S): ReturnValue<S, BasicStateAction<S>>
function useState<S>(initialState: MaybeRef<S> | ((s: S) => S)): ReturnValue<S, BasicStateAction<S>> {
  return useReducer<S, BasicStateAction<S>>(basicStateReducer, initialState as S)
}

export default useState
