import type { Ref } from 'vue-demi'
import { isRef } from 'vue-demi'
import type { MaybeRef } from '@m9ch/vhooks-types'
import { useMemo } from './memo'

/**
 * similar to `React.useRef`, but returns `Vue.ref`
 */
export const useRef = <T>(value?: MaybeRef<T>): Ref<T> => useMemo(() => unref(value), [])
