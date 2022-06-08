# @m9ch/vhooks

Missing React-like hooks in vue Composition API.

## All hooks

| Hook | Description |
| ---- | ----------- |
| useState | Return a `Readonly<Ref>`, and function to update it |
| useEffect | Accepts a function that contains imperative, possibly effectful code |
| useContext | Accepts a context object returned by `createContext` and returns the current context value |
| useReducer | An alternative to `useState`. Accepts a reducer function |
| useCallback | Returns a `Readonly<Ref>` of memoized callback |
| useMemo | Returns a `Readonly<Ref>` of memoized value |
| useRef | An alternative to `ref` |
| useUpdate | An alternative to `watch` |
| useCountdown | Simple countdown timer, returns states and control functions |
| useEvent | Simple `EventEmitter` implemention, to publish/subscrive events cross components |
| useEventBus | Returns `EventEmitter` with namespace |
| useResetableRef | Returns `Ref` and a reset function to reset to initial value |
