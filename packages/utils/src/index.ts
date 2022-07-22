export const isObject = (val: unknown): val is object => {
  return typeof val === 'object' && val !== null
}

export const isFunction = (val: unknown): val is Function => typeof val === 'function'
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isUndef = (val: unknown): val is undefined => typeof val === 'undefined'
