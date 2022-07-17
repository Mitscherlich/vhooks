# useThrottleFn

A hook that deals with the throttled function.

## API

```ts
interface ThrottleOptions {
  wait?: number
  leading?: boolean
  trailing?: boolean
}

function useThrottleFn<T extends Fn<unknown>>(
  fn: MaybeRef<T>,
  options?: ThrottleOptions
): {
  run: T
  cancel: () => void
  flush: () => void
}
```
