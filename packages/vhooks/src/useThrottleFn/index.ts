import type { MaybeRef } from '@m9ch/vhooks-types'
import { onUnmounted } from 'vue-demi'
import throttle from 'lodash/throttle'
import useMemo from '../useMemo'
import useLatest from '../useLatest'
import type { ThrottleOptions } from './types'

type noop = (...args: any) => any

export default function useThrottleFn<T extends noop>(fn: MaybeRef<T>, options?: ThrottleOptions) {
  const fnRef = useLatest(fn)

  const wait = options?.wait ?? 1000

  const throttled = useMemo(
    () =>
      throttle(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.value(...args as any[])
        },
        wait,
        options,
      ),
    [],
  )

  onUnmounted(() => {
    throttled.value.cancel()
  })

  const run = function (...args: Parameters<T>) {
    throttled.value.apply(this, args)
  }

  const cancel = () => {
    throttled.value.cancel()
  }

  const flush = () => {
    throttled.value.flush()
  }

  return { run, cancel, flush }
}
