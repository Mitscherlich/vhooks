# useDebounceEffect

Debounced `useEffect`.

## API

```ts
interface DebounceOptions {
  wait?: number
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

function useDebounceEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: DebounceOptions,
): void
```
