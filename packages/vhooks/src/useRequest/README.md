# useRequest

`useRequest` is a powerful hook for asynchronous data management. `useRequest` is sufficient enough for network request scenarios in your projects.

`useRequest` organizes code through a plug-in pattern, the core code is extremely simple, and can be easily extended for more advanced features. Current features include:

- Automatic/manual request
- Polling
- Debounce
- Throttle
- Refresh on window focus
- Error retry
- Loading delay
- SWR(stale-while-revalidate)
- Caching

## API

```ts
interface Service<TData, TParams extends any[]> {
  (...args: TParams): Promise<TData>
}

interface Options<TData, TParams extends any[]> {
  manual?: boolean

  onBefore?: (params: TParams) => void
  onSuccess?: (data: TData, params: TParams) => void
  onError?: (e: Error, params: TParams) => void
  // formatResult?: (res: any) => TData;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void

  defaultParams?: TParams

  // refreshDeps
  refreshDeps?: DependencyList
  refreshDepsAction?: () => void

  // loading delay
  loadingDelay?: number

  // polling
  pollingInterval?: number
  pollingWhenHidden?: boolean
  pollingErrorRetryCount?: number

  // refresh on window focus
  refreshOnWindowFocus?: boolean
  focusTimespan?: number

  // debounce
  debounceWait?: number
  debounceLeading?: boolean
  debounceTrailing?: boolean
  debounceMaxWait?: number

  // throttle
  throttleWait?: number
  throttleLeading?: boolean
  throttleTrailing?: boolean

  // cache
  cacheKey?: string
  cacheTime?: number
  staleTime?: number
  setCache?: (data: CachedData<TData, TParams>) => void
  getCache?: (params: TParams) => CachedData<TData, TParams> | undefined

  // retry
  retryCount?: number
  retryInterval?: number

  // ready
  ready?: boolean

  // [key: string]: any;
}

interface Plugin<TData, TParams extends any[]> {
  (fetchInstance: Fetch<TData, TParams>, options: Options<TData, TParams>): PluginReturn<
    TData,
    TParams
  >
  onInit?: (options: Options<TData, TParams>) => Partial<FetchState<TData, TParams>>
}

function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[],
): {
  loading: boolean
  data?: TData
  error?: Error
  params: TParams | []
  cancel: () => void
  refresh: () => void
  refreshAsync: () => Promise<TData>
  run: (...params: TParams) => void
  runAsync: (...params: TParams) => Promise<TData>
  mutate: (data?: TData | ((oldData?: TData) => TData)) => void
}
```
