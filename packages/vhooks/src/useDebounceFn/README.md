# useDebounceFn

A hook that deals with the debounced function.

## API

```ts
interface DebounceOptions {
  wait?: number
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

function useDebounceFn<T extends Fn<unknown>>(
  fn: MaybeRef<T>,
  options?: DebounceOptions
): {
  run: T
  cancel: () => void
  flush: () => void
}
```
