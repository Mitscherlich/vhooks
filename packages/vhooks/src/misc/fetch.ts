import type { MaybeRef } from '@m9ch/vhooks-types'
import { useEffect } from '../core/effect'
import type { Ref } from 'vue-demi'
import { readonly, ref, unref } from 'vue-demi'

export const useFetch = <T>(fetch: () => Promise<T>, defaultValue: MaybeRef<T>, deps: any[] = []) => {
  const loading = ref<boolean>(false)
  const error = ref<any>(null)
  const data = ref<T>(unref(defaultValue)) as Ref<T>

  useEffect(() => {
    loading.value = true
    fetch()
      .then((response) => {
        data.value = response
      })
      .catch((e) => {
        error.value = e
      })
      .finally(() => {
        loading.value = false
      })
  }, [...deps])

  return {
    loading: readonly(loading),
    error: readonly(error),
    data: readonly(data),
  }
}
