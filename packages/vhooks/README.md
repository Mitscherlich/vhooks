# @m9ch/vhooks

Missing React-like hooks in vue Composition API.

## All hooks

| Hook | Description |
| ---- | ----------- |
| [useState](./src/useState/README.md) | Return a `Readonly<Ref>`, and function to update it |
| [useEffect](./src/useEffect/README.md) | Accepts a function that contains imperative, possibly effectful code |
| [useContext](./src/useContext/README.md) | Accepts a context object returned by `createContext` and returns the current context value |
| [useReducer](./src/useReducer/README.md) | An alternative to `useState`. Accepts a reducer function |
| [useCallback](./src/useCallback/README.md) | Returns a `Readonly<Ref>` of memoized callback |
| [useMemo](./src/useMemo/README.md) | Returns a `Readonly<Ref>` of memoized value |
| [useRef](./src/useRef/README.md) | An alternative to `ref` |
| [usePrevious](./src/usePrevious/README.md) | A Hook to return the previous state |
| [useUpdate](./src/useUpdate/README.md) | Returns a function which can be used to force the component re-render |
| [useLatest](./src/useLatest/README.md) | Returns a `Ref` which always return a latest value |
| [useLockFn](./src/useLockFn/README.md) | Add a lock to an async function to prevent parallel executions |
| [useAsyncEffect](./src/useAsyncEffect/README.md) | Similar with `useEffect` but support async function |
| [useCountDown](./src/useCountDown/README.md) | Simple countdown timer, returns states and control functions |
| [useEventEmitter](./src/useEventEmitter/README.md) | Simple publisher/subscriber pattern implement |
| [useResetableRef](./src/useResetableRef/README.md) | Returns `Ref` and a reset function to reset to initial value |
| [useUpdateEffect](./src/useUpdateEffect/README.md) | A hook alike `useEffect` but skips running the effect for the first time |
| [useDeepCompareEffect](./src/useDeepCompareEffect/README.md) | Usage is the same as `useEffect`, but deps are compared with [lodash.isEqual](https://lodash.com/docs/4.17.15#isEqual) |
| [useDebounceFn](./src/useDebounceFn/README.md) | A hook that deals with the debounced function |
| [useDebounceEffect](./src/useDebounceEffect/README.md) | Debounced `useEffect` |
| [useThrottleFn](./src/useThrottleFn/README.md) | A hook that deals with the throttled function |
| [useThrottleEffect](./src/useThrottleEffect/README.md) | Throttled `useEffect` |
| [useRafInterval](./src/useRafInterval/README.md) | A hook implements with `requestAnimationFrame` for better performance |
| [useRafState](./src/useRafState/README.md) | Update the state in [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) callback |
