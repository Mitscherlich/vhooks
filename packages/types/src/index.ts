import type { Ref } from 'vue'

type Unwrap<T> = T extends Record<string, infer U>
  ? U
  : T extends (infer U)[]
    ? U
    : T
type isPrimitive<T> = T extends Unwrap<T> ? T : never

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends isPrimitive<T[P]>
    ? T[P]
    : DeepReadonly<T[P]>;
}

export type Action<S> = ((state: S) => S) | S
export type Dispatch<S, A extends Action<S>> = (action: A) => void
export type Reducer<S, A extends Action<S>> = (
  state: S,
  action: A,
) => S
export type ReturnValue<S, A extends Action<S>> = [
  Readonly<Ref<S>>,
  Dispatch<S, A>,
]

export type Destructor = () => void
export type EffectCallback = () => void | Destructor

export type DependencyList = ReadonlyArray<unknown>

export type MutableRef<T> = Ref<T> & {
  current?: T
}

export { MaybeRef } from 'vue'
