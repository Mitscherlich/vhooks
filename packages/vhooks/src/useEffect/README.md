# useEffect

## API

```ts
type EffectCallback = () => void | (() => void)
type DependencyList = any[] | void | null

function useEffect(fn: EffectCallback, deps?: DependencyList): void
```
