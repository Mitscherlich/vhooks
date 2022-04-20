import { useMemo } from './memo'

/**
 * similar to `React.useCallback`, but return a Vue.ref for the state.
 */
export const useCallback = <T extends (...args: any[]) => any>(fn: T, deps: any[] = []) => useMemo(() => fn, deps)
