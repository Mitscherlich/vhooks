import type { MaybeRef } from '@m9ch/vhooks-types'
import { useEffect } from '../core/effect'
import type { Ref } from 'vue-demi'
import { readonly, ref, unref } from 'vue-demi'

export const useFetch = <T>(fetch: () => Promise<T>, defaultValue?: MaybeRef<T>, deps: any[] = []) => {
  const loading = ref<boolean>(false)
  const error = ref<any>(null)
  const data = ref<T>(unref(defaultValue)) as Ref<T>

  const reload = async () => {
    if (loading.value)
      return

    loading.value = true
    try {
      data.value = await fetch()
    }
    catch (e) {
      error.value = e
    }
    finally {
      loading.value = false
    }
  }

  useEffect(() => {
    reload()
  }, [...deps])

  return {
    loading: readonly(loading),
    error: readonly(error),
    data: readonly(data),
    reload,
  }
}
