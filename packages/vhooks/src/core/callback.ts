import { useMemo } from './memo'

export const useCallback = <T extends (...args: any[]) => any>(fn: T, deps: any[] = []) => useMemo(() => fn, deps)
