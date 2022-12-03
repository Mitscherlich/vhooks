import type {
  Options as AjvOptions,
  Plugin as AjvPlugin,
  ErrorObject,
  SchemaObject,
  ValidateFunction,
} from 'ajv'
import type { Ref } from 'vue'
import type Ajv from './Ajv'
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
  data?: TData
  errors?: ErrorObject[]
}
export interface Result<TData, TSchema> {
  status: Readonly<Ref<Status>>
  data?: Readonly<Ref<TData>>
  errors?: Readonly<Ref<ErrorObject[] | []>>
  compile: Ajv<TData, TSchema>['compile']
  compileAsync: Ajv<TData, TSchema>['compileAsync']
  run: Ajv<TData, TSchema>['run']
}

export {
  ErrorObject,
  SchemaObject,
  ValidateFunction,
}
