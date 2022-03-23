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

export type Destroyer = () => void
export type EffectCallback = () => void | Destroyer

export type mixed = any
export type DependenciesList = Array<mixed> | void | null
