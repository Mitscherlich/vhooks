import { ref } from 'vue-demi'
import Ajv from 'ajv'
import ajvErrors from 'ajv-errors'
import ajvFormat from 'ajv-formats'
import type { AnyValidateFunction, Options, SchemaType } from './types'

class AjvInstanceManager<T = unknown> {
  static create<T>(opts?: Options) {
    return new AjvInstanceManager<T>(opts)
  }

  ajv: Ajv
  opts: Options

  schema?: SchemaType

  compiled?: AnyValidateFunction<T>

  _singal = ref(0)

  constructor(opts?: Options) {
    this.ajv = new Ajv(opts)
    this.opts = opts
    this.schema = opts.schema
  }

  get signalRef() {
    return this._singal
  }

  _installPlugins() {
    ajvErrors(this.ajv, this.opts.errors)
    ajvFormat(this.ajv, this.opts.format)
  }

  _update() {
    this._singal.value += 1
  }

  async compile(schema: SchemaType = this.schema) {
    this.compiled = await this.ajv.compileAsync<T>(schema)

    return this.compiled
  }

  async run(data: T, dataCtx?: any) {
    let fn = this.compiled

    if (!fn)
      fn = await this.compile()

    try {
      return await fn(data, dataCtx)
    }
    finally {
      this._update()
    }
  }
}

export const getAjvInstance = <T = unknown>(opts?: Options) => {
  return AjvInstanceManager.create<T>(opts)
}
