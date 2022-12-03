import type {
  Options as AjvOptions,
  Plugin as AjvPlugin,
  ErrorObject,
  SchemaObject,
  ValidateFunction,
} from 'ajv'
import type { Status } from './constants'

export type Subscribe = () => void

export interface Plugin<T = unknown> {
  install: AjvPlugin<T>
  options?: T
  [key: string]: any
}
export interface PluginOpts {
  [key: string]: any
}

export interface Options extends AjvOptions {
  pluginOpts?: PluginOpts
}
export interface State<TData> {
  status: Status
  data: TData
  errors: ErrorObject[]
}

export {
  SchemaObject,
  ValidateFunction,
}
