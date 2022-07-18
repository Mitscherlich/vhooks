import type { DependencyList } from '@m9ch/vhooks-types'
import { isFunction } from '@m9ch/vhooks-utils'
import useEffect from '../useEffect'

export default function useAsyncEffect(
  effect: () => AsyncGenerator<void, void, void> | Promise<void>,
  deps?: DependencyList,
) {
  function isAsyncGenerator(
    val: AsyncGenerator<void, void, void> | Promise<void>,
  ): val is AsyncGenerator<void, void, void> {
    return isFunction(val[Symbol.asyncIterator])
  }

  useEffect(() => {
    const e = effect()
    let cancelled = false
    async function execute() {
      if (isAsyncGenerator(e)) {
        while (true) {
          const result = await e.next()
          if (result.done || cancelled)
            break
        }
      }
      else {
        await e
      }
    }
    execute()
    return () => {
      cancelled = true
    }
  }, deps)
}
