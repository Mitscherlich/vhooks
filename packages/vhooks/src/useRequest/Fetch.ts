import { isFunction } from 'lodash'
import { reactive } from 'vue-demi'
import type { FetchState, Options, PluginReturn, Service, Subscribe } from './types'

export default class Fetch<TData, TParams extends any[]> {
  pluginImpls: PluginReturn<TData, TParams>[]

  count = 0

  state: FetchState<TData, TParams> = reactive({
    loading: false,
    params: undefined,
    data: undefined,
    error: undefined,
  })

  constructor(
    public service: Service<TData, TParams>,
    public options: Options<TData, TParams>,
    public subscribe: Subscribe,
    public initState: Partial<FetchState<TData, TParams>> = {},
  ) {
    this._SET_STATE({
      ...this.state,
      loading: !options.manual,
      ...initState,
    })
  }

  _SET_STATE(updator: ((s: Partial<FetchState<TData, TParams>>) => Partial<FetchState<TData, TParams>>) | Partial<FetchState<TData, TParams>>) {
    Object.assign(this.state, typeof updator === 'function'
      ? updator(this.state)
      : updator,
    )
  }

  setState(s: Partial<FetchState<TData, TParams>> = {}) {
    this._SET_STATE({
      ...this.state,
      ...s,
    })
    this.subscribe()
  }

  runPluginHandler(event: keyof PluginReturn<TData, TParams>, ...args: any[]) {
    // @ts-ignore
    const r = this.pluginImpls.map(i => i[event]?.(...args)).filter(Boolean)
    return Object.assign({}, ...r)
  }

  async runAsync(...params: TParams): Promise<TData> {
    this.count += 1
    const currentCount = this.count

    const {
      stopNow = false,
      returnNow = false,
      ...state
    } = this.runPluginHandler('onBefore', params)

    // stop request
    if (stopNow)
      return new Promise(() => {})

    this.setState({
      loading: true,
      params,
      ...state,
    })

    // return now
    if (returnNow)
      return Promise.resolve(state.data)

    this.options.onBefore?.(params)

    try {
      // replace service
      let { servicePromise } = this.runPluginHandler('onRequest', this.service, params)

      if (!servicePromise)
        servicePromise = this.service(...params)

      const res = await servicePromise

      if (currentCount !== this.count) {
        // prevent run.then when request is canceled
        return new Promise(() => {})
      }

      // const formattedResult = this.options.formatResult ? this.options.formatResultRef.current(res) : res;

      this.setState({
        data: res,
        error: undefined,
        loading: false,
      })

      this.options.onSuccess?.(res, params)
      this.runPluginHandler('onSuccess', res, params)

      this.options.onFinally?.(params, res, undefined)

      if (currentCount === this.count)
        this.runPluginHandler('onFinally', params, res, undefined)

      return res
    }
    catch (error) {
      if (currentCount !== this.count) {
        // prevent run.then when request is canceled
        return new Promise(() => {})
      }

      this.setState({
        error,
        loading: false,
      })

      this.options.onError?.(error, params)
      this.runPluginHandler('onError', error, params)

      this.options.onFinally?.(params, undefined, error)

      if (currentCount === this.count)
        this.runPluginHandler('onFinally', params, undefined, error)

      throw error
    }
  }

  run(...params: TParams) {
    this.runAsync(...params).catch((error) => {
      if (!this.options.onError)
        console.error(error)
    })
  }

  cancel() {
    this.count += 1
    this.setState({
      loading: false,
    })

    this.runPluginHandler('onCancel')
  }

  refresh() {
    // @ts-ignore
    this.run(...(this.state.params || []))
  }

  refreshAsync() {
    // @ts-ignore
    return this.runAsync(...(this.state.params || []))
  }

  mutate(data?: TData | ((oldData?: TData) => TData | undefined)) {
    const targetData = isFunction(data) ? data(this.state.data) : data
    this.runPluginHandler('onMutate', targetData)
    this.setState({
      data: targetData,
    })
  }
}
