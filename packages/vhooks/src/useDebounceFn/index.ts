import type { MaybeRef } from '@m9ch/vhooks-types'
import { onUnmounted } from 'vue-demi'
import debounce from 'lodash/debounce'
import useMemo from '../useMemo'
import useLatest from '../useLatest'
import type { DebounceOptions } from './types'

type noop = (...args: any) => any

export default function useDebounceFn<T extends noop>(fn: MaybeRef<T>, options?: DebounceOptions) {
  const fnRef = useLatest(fn)

  const wait = options?.wait ?? 1000

  const debounced = useMemo(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.value(...args as any[])
        },
        wait,
        options,
      ),
    [],
  )

  onUnmounted(() => {
    debounced.value.cancel()
  })

  const run = () => {
    debounced.value()
  }

  const cancel = () => {
    debounced.value.cancel()
  }

  const flush = () => {
    debounced.value.flush()
  }

  return { run, cancel, flush }
}
