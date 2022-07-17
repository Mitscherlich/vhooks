# useReducer

## API

```ts
type Action<S> = (state: S) => S
type Dispatch<A> = (action: A) => void
type Reducer<S, A> = (state: S, action: A) => S
type ReturnValue<S, A> = [
  DeepReadonly<S>,
  Dispatch<A>
]

function useReducer<S, A>(
  reducer: Reducer<S, A>,
  initialArg: S,
  init?: A,
): ReturnValue<Ref<S>, A>
```
