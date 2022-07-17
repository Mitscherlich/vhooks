# useThrottleEffect

Throttled `useEffect`.

## API

```ts
interface ThrottleOptions {
  wait?: number
  leading?: boolean
  trailing?: boolean
}

function useThrottleEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: ThrottleOptions
): void
```
