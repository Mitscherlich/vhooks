# useAjv

## API

```ts
function useAjv<T>(schema: object, opts?: AjvOptions): {
  validate: (data: T, dataCtx?: any) => Promise<boolean | T>
  errors: Ref<AjvError[]>
}
```
