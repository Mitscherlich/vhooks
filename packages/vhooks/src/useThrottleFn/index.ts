import type { MaybeRef } from '@m9ch/vhooks-types'
import { onUnmounted } from 'vue-demi'
import throttle from 'lodash/throttle'
import useLatest from '../useLatest'
import type { ThrottleOptions } from './types'

type noop = (...args: any) => any

export default function useThrottleFn<T extends noop>(fn: MaybeRef<T>, options?: ThrottleOptions) {
  const fnRef = useLatest(fn)

  const wait = options?.wait ?? 1000

  const throttled = throttle(
    (...args: Parameters<T>): ReturnType<T> => {
      return fnRef.value(...args as any[])
    },
    wait,
    options,
  )

  onUnmounted(() => {
    throttled.cancel()
  })

  const run = function (...args: Parameters<T>) {
    throttled.apply(this, args)
  }

  const cancel = () => {
    throttled.cancel()
  }

  const flush = () => {
    throttled.flush()
  }

  return { run, cancel, flush }
}
