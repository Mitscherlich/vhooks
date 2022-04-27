import type { Ref } from 'vue-demi'
import { unref } from 'vue-demi'
import type { DeepReadonly, MaybeRef } from '@m9ch/vhooks-types'
import { useMemo } from './memo'

/**
 * similar to `React.useRef`, but returns `Vue.ref`
 */
export const useRef = <T>(value?: MaybeRef<T>): DeepReadonly<Ref<T>> => useMemo<T>(() => unref<T>(value), [])
