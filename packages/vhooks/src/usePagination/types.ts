import type { DeepReadonly, Ref } from 'vue-demi'
import type { Options, Result } from '../useRequest/types'

export interface Data { total: number; list: any[] }

export type Params = [{ current: number; pageSize: number; [key: string]: any }, ...any[]]

export type Service<TData extends Data, TParams extends Params> = (
  ...args: TParams
) => Promise<TData>

export interface PaginationResult<TData extends Data, TParams extends Params> extends Result<TData, TParams> {
  pagination: {
    current: DeepReadonly<Ref<number>>
    pageSize: DeepReadonly<Ref<number>>
    total: DeepReadonly<Ref<number>>
    totalPage: DeepReadonly<Ref<number>>
    onChange: (current: number, pageSize: number) => void
    changeCurrent: (current: number) => void
    changePageSize: (pageSize: number) => void
  }
}

export interface PaginationOptions<TData extends Data, TParams extends Params> extends Options<TData, TParams> {
  defaultPageSize?: number
}
