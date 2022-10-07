import { computed } from 'vue-demi'
import useRequest from '../useRequest'

import type { Data, PaginationOptions, PaginationResult, Params, Service } from './types'

export default function usePagination<TData extends Data, TParams extends Params>(
  service: Service<TData, TParams>,
  options: PaginationOptions<TData, TParams> = {},
) {
  const { defaultPageSize = 10, ...rest } = options

  const { data, params, ...result } = useRequest(service, {
    defaultParams: [{ current: 1, pageSize: defaultPageSize }],
    refreshDepsAction: () => {
      changeCurrent(1)
    },
    ...rest,
  })

  const current = computed(() => params.value[0].current ?? 1)
  const pageSize = computed(() => params.value[0].pageSize ?? defaultPageSize)
  const total = computed(() => data.value?.total || 0)
  const totalPage = computed(() => Math.ceil(total.value / pageSize.value))

  const onChange = (c: number, p: number) => {
    let toCurrent = c <= 0 ? 1 : c
    const toPageSize = p <= 0 ? 1 : p
    const tempTotalPage = Math.ceil(total.value / toPageSize)
    if (toCurrent > tempTotalPage)
      toCurrent = Math.max(1, tempTotalPage)

    const [oldPaginationParams = {}, ...restParams] = params.value || []

    result.run(
      {
        ...oldPaginationParams,
        current: toCurrent,
        pageSize: toPageSize,
      },
      ...restParams,
    )
  }

  const changeCurrent = (c: number) => {
    onChange(c, pageSize.value)
  }

  const changePageSize = (p: number) => {
    onChange(current.value, p)
  }

  return {
    data,
    params,
    ...result,
    pagination: {
      current,
      pageSize,
      total,
      totalPage,
      onChange,
      changeCurrent,
      changePageSize,
    },
  } as PaginationResult<TData, TParams>
}
