export const toArray = <T>(val: T | T[]): T[] => Array.isArray(val) ? val : [val]

export const remove = <T>(arr: T[], el: T): void => {
  const i = arr.indexOf(el)
  if (i > -1) arr.splice(i, 1)
}

export const compose = <T>(...fns: ((x: T) => T)[]): (x: T) => T => {
  return fns.reduce((f, g) => x => f(g(x)))
}

export const run = <T>(...fns: ((x: T) => T)[]): (x: T) => T => {
  return fns.reduce((f, g) => x => g(f(x)))
}

export type CurriedFn<T> = (...args: any[]) => T | CurriedFn<T>

export const curry = <T>(fn: (...args: any[]) => T, ...args: any[]): T | CurriedFn<T> => {
  return args.length >= fn.length ? fn(...args) : (...newArgs: any[]) => curry(fn, ...args, ...newArgs)
}
