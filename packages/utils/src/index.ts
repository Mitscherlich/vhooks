export { toArray, remove } from './array'

export const isPrimitive = (val: any): val is string | number | boolean => {
  return ['string', 'number', 'boolean'].includes(typeof val)
}

export const isObject = (val: any): val is object => {
  return typeof val === 'object' && val !== null
}

export const shallowEqual = (a: any, b: any): boolean => {
  if (isPrimitive(a) || isPrimitive(b))
    return a === b
  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length)
      return false
    for (const key of keysA) {
      if (!keysB.includes(key) || !shallowEqual(a[key], b[key]))
        return false
    }

    return true
  }
  return false
}

export const copy = <T>(val: T): T => {
  if (isPrimitive(val))
    return val
  if (isObject(val)) {
    const copy = {} as T
    for (const key in val) copy[key] = val[key]
    return copy
  }
  return val
}

export * as fn from './fn'
