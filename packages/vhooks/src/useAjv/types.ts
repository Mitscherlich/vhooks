import type {
  Options as AjvOptions,
  AsyncSchema,
  AsyncValidateFunction,
  SchemaObject,
  ValidateFunction,
} from 'ajv'
import type { ErrorMessageOptions } from 'ajv-errors'
import type { FormatName, FormatOptions } from 'ajv-formats'

export type SchemaType = SchemaObject | AsyncSchema

export type AnyValidateFunction<T = unknown> = AsyncValidateFunction<T> | ValidateFunction<T>

export type Options = AjvOptions & {
  errors?: ErrorMessageOptions
} & {
  format?: FormatOptions | FormatName[]
} & {
  schema?: SchemaType
}
