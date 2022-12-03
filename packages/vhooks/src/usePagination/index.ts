import { computed, reactive, unref } from 'vue-demi'
import useMemo from '../useMemo'
import useRequest from '../useRequest'

import type { Data, PaginationOptions, PaginationResult, Params, Service } from './types'

export default function usePagination<TData extends Data, TParams extends Params>(
  service: Service<TData, TParams>,
  options: PaginationOptions<TData, TParams> = {},
) {
  const { defaultPageSize = 10, defaultCurrent = 1, ...rest } = options

  const result = useRequest(service, {
    defaultParams: [{ current: defaultCurrent, pageSize: defaultPageSize }],
    refreshDepsAction: () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      changeCurrent(1)
    },
    ...rest,
  })

  const current = computed(() => {
    const { current = 1 } = unref(result.params)[0] || {}
    return current
  })
  const pageSize = computed(() => {
    const { pageSize = defaultPageSize } = unref(result.params)[0] || {}
    return pageSize
  })

  const total = computed(() => unref(result.data)?.total || 0)
  const totalPage = useMemo(() => Math.ceil(unref(total) / unref(pageSize)), [pageSize, total])

  const onChange = (c: number, p: number) => {
    let toCurrent = c <= 0 ? 1 : c
    const toPageSize = p <= 0 ? 1 : p
    const tempTotalPage = Math.ceil(unref(total) / toPageSize)
    if (toCurrent > tempTotalPage)
      toCurrent = Math.max(1, tempTotalPage)

    const [oldPaginationParams = {}, ...restParams] = unref(result.params) || []

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
    onChange(c, unref(pageSize))
  }

  const changePageSize = (p: number) => {
    onChange(unref(current), p)
  }

  return {
    ...result,
    pagination: reactive({
      current,
      pageSize,
      total,
      totalPage,
      onChange,
      changeCurrent,
      changePageSize,
    }),
  } as PaginationResult<TData, TParams>
}
