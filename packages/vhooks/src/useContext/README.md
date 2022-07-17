# useContext

## API

```ts
type ContextId<T> = InjectionKey<{ value: DeepReadonly<Ref<T>> }>

interface Context<T> {
  Provider: DefineComponent<{ value: MaybeRef<T> }>
  Consumer: DefineComponent<never>
}

function createContext<T>(defaultValue: MaybeRef<T>, contextId?: ContextId<T>): Context<T>

function useContext<T>(context: Context<T>): DeepReadonly<Ref<T>>
```
