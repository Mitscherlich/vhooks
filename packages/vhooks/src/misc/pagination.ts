import type { MaybeRef } from '@m9ch/vhooks-types'
import { get } from '@m9ch/vhooks-utils'
import { computed, readonly } from 'vue-demi'
import { useResetableRef } from '../state/resetableRef'
import { useFetch } from './fetch'

export interface PaginationOptions {
  currentKey?: string
  pageSizeKey?: string
  totalKey?: string
  totalPageKey?: string
}

export const usePagination = <T>(fetch: () => Promise<T>, options: PaginationOptions = {}, defaultValue?: MaybeRef<T>, deps: any[] = []) => {
  const defaultOptions: PaginationOptions = {
    currentKey: 'pageNo',
    pageSizeKey: 'pageSize',
    totalKey: 'total',
    totalPageKey: 'totalPage',
  }

  const { currentKey, pageSizeKey, totalKey, totalPageKey } = {
    ...defaultOptions,
    ...options,
  }

  const [pagination, reset] = useResetableRef({
    [currentKey]: 1,
    [pageSizeKey]: 10,
  })

  const { data, loading, error, reload: mutate } = useFetch(fetch, defaultValue, deps)

  const paging = (paginationParams: Record<string, number>) => {
    const oldPaginationParams = { ...pagination.value }
    const newPaginationParams = {
      ...oldPaginationParams,
      ...paginationParams,
    }
    pagination.value = newPaginationParams
    mutate()
  }

  // changeCurrent change current page (current: number) => void
  const changeCurrent = (current: number) => {
    paging({ [currentKey]: current })
  }

  // changePageSize change pageSize (pageSize: number) => void
  const changePageSize = (pageSize: number) => {
    paging({ [pageSizeKey]: pageSize })
  }

  // changePagination change current and pageSize (current: number, pageSize: number) => void
  const changePagination = (current: number, pageSize: number) => {
    paging({ [currentKey]: current, [pageSizeKey]: pageSize })
  }

  const reload = () => {
    reset()
    mutate()
  }

  const total = computed<number>(() => get(data.value, totalKey, 0))
  const current = computed({
    get: () => pagination.value[currentKey] ?? 1,
    set: (val: number) => {
      changeCurrent(val)
    },
  })
  const pageSize = computed({
    get: () => pagination.value[pageSizeKey] ?? 10,
    set: (val: number) => {
      changePageSize(val)
    },
  })
  const totalPage = computed<number>(() => get(data.value, totalPageKey, Math.ceil(total.value / pageSize.value)))

  return {
    loading,
    data,
    error,
    current,
    pageSize,
    total,
    totalPage,
    pagination: readonly(pagination),
    changeCurrent,
    changePageSize,
    changePagination,
    reload,
  }  
}
