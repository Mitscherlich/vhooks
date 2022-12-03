import {
  EventEmitter,
} from '@m9ch/vhooks-utils'
import type { ErrorObject } from 'ajv'
import Ajv from 'ajv'
import { reactive } from 'vue-demi'
import type {
  Options,
  Plugin,
  SchemaObject,
  State,
  Subscribe,
  ValidateFunction,
} from './types'
import { Status } from './constants'

export default class AjvInstance<TData, TSchema> extends EventEmitter {
  ajvInstance: Ajv

  pluginImpls: Plugin[]

  compiled: ValidateFunction<TSchema>

  state = reactive<State<TData>>({
    status: Status.Idle,
    data: null,
    errors: [] as ErrorObject[],
  })

  constructor(
    public _schema: SchemaObject,
    public options: Options,
    public subscribe: Subscribe,
  ) {
    super()
    this.ajvInstance = new Ajv({
      allErrors: true,
      ...options,
    })
    if (this.schema)
      this.compile()
  }

  setState(s: Partial<State<TData>> = {}) {
    Object.assign(this.state, s)
    this.subscribe()
  }

  use<T = unknown>(plugin: Plugin<T>, opts?: T) {
    plugin.install(this.ajvInstance, opts)
    plugin.options = opts

    this.pluginImpls.push(plugin)
  }

  runPluginHandler(event: string, ...args: any[]) {
    this.pluginImpls.forEach((plugin) => {
      plugin[event]?.(...args)
    })
  }

  get schema() {
    return this._schema
  }

  set schema(s: object) {
    this._schema = s
    this.compile()
  }

  async compileAsync() {
    this.compiled = await this.ajvInstance.compileAsync<TSchema>(this.schema)
  }

  compile() {
    this.compileAsync().catch((error) => {
      this.emit('schema:compile:error', error)
      this.runPluginHandler('onSchemaCompileError', error, this.schema)
    })
  }

  run(data: TData) {
    this.setState({ data })
    const result = this.compiled(data)
    if (!result) {
      this.setState({
        status: Status.Rejected,
        errors: this.compiled.errors,
      })
    }
    else {
      this.setState({
        status: Status.Resolved,
      })
    }
  }
}
