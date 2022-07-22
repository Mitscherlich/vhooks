import type { MaybeRef } from '@m9ch/vhooks-types'
import { onMounted, onUnmounted, readonly, toRefs } from 'vue-demi'
import useLatest from '../useLatest'
import useUpdate from '../useUpdate'
import type { Options, Plugin, Result, Service } from './types'
import Fetch from './Fetch'

export default function useRequestImplement<TData, TParams extends any[]>(
  service: MaybeRef<Service<TData, TParams>>,
  options: Options<TData, TParams> = {},
  plugins: Plugin<TData, TParams>[] = [],
) {
  const { manual = false, ...rest } = options

  const fetchOptions = {
    manual,
    ...rest,
  }

  const serviceRef = useLatest(service)

  const update = useUpdate()

  const fetchInstance = (() => {
    const initState = plugins.map(p => p?.onInit?.(fetchOptions)).filter(Boolean)

    return new Fetch<TData, TParams>(
      serviceRef,
      fetchOptions,
      update,
      Object.assign({}, ...initState),
    )
  })()
  fetchInstance.options = fetchOptions
  // run all plugins hooks
  fetchInstance.pluginImpls = plugins.map(p => p(fetchInstance, fetchOptions))

  onMounted(() => {
    if (!manual) {
      // useCachePlugin can set fetchInstance.state.params from cache when init
      const params = fetchInstance.state.params || options.defaultParams || []
      // @ts-expect-error params may not satisfy TParams
      fetchInstance.run(...params)
    }
  })

  onUnmounted(() => {
    fetchInstance.cancel()
  })

  const { loading, data, error, params } = toRefs(fetchInstance.state)

  return {
    loading: readonly(loading),
    data: readonly(data),
    error: readonly(error),
    params: readonly(params),
    cancel: fetchInstance.cancel.bind(fetchInstance),
    refresh: fetchInstance.refresh.bind(fetchInstance),
    refreshAsync: fetchInstance.refreshAsync.bind(fetchInstance),
    run: fetchInstance.run.bind(fetchInstance),
    runAsync: fetchInstance.runAsync.bind(fetchInstance),
    mutate: fetchInstance.mutate.bind(fetchInstance),
  } as Result<TData, TParams>
}
