import type { DebounceSettings, DebouncedFunc } from 'lodash'
import debounce from 'lodash/debounce'
import useEffect from '../../useEffect'
import useMemo from '../../useMemo'
import useRef from '../../useRef'
import type { Plugin } from '../types'

const useDebouncePlugin: Plugin<any, any[]> = (
  fetchInstance,
  { debounceWait, debounceLeading, debounceTrailing, debounceMaxWait },
) => {
  const debouncedRef = useRef<DebouncedFunc<any>>()

  const options = useMemo(() => {
    const ret: DebounceSettings = {}
    if (debounceLeading !== undefined)
      ret.leading = debounceLeading

    if (debounceTrailing !== undefined)
      ret.trailing = debounceTrailing

    if (debounceMaxWait !== undefined)
      ret.maxWait = debounceMaxWait

    return ret
  }, [debounceLeading, debounceTrailing, debounceMaxWait])

  useEffect(() => {
    if (debounceWait) {
      const _originRunAsync = fetchInstance.runAsync.bind(fetchInstance)

      debouncedRef.value = debounce(
        (callback) => {
          callback()
        },
        debounceWait,
        options,
      )

      // debounce runAsync should be promise
      // https://github.com/lodash/lodash/issues/4400#issuecomment-834800398
      fetchInstance.runAsync = (...args) => {
        return new Promise((resolve, reject) => {
          debouncedRef.value?.(() => {
            _originRunAsync(...args)
              .then(resolve)
              .catch(reject)
          })
        })
      }

      return () => {
        debouncedRef.value?.cancel()
        fetchInstance.runAsync = _originRunAsync
      }
    }
  }, [debounceWait, options])

  if (!debounceWait)
    return {}

  return {
    onCancel: () => {
      debouncedRef.value?.cancel()
    },
  }
}

export default useDebouncePlugin
