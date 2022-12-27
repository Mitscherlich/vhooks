import type { Ref } from 'vue'

export type Fn<T> = (...args: any[]) => T

export type MaybeRef<T> = T | Ref<T>

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

export type Action<S> = (state: S) => S
export type Dispatch<A> = (action: A) => void
export type Reducer<S, A> = (
  state: S,
  action: A,
) => S
export type ReturnValue<S, A> = [
  DeepReadonly<S>,
  Dispatch<A>,
]

export type Destructor = () => void
export type EffectCallback = () => void | Destructor

export type DependencyList = ReadonlyArray<unknown>

export type MutableRef<T> = Ref<T> & {
  current?: T
}
