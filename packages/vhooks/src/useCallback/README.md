# useCallback

Returns a function which always be latest.

## API

```ts
type Fn<P extends any[], R> = (...args: P) => R

function useCallback<P extends any[], R>(fn: MaybeRef<Fn<P, R>>, deps?: DependencyList): Fn<P, R>
```
