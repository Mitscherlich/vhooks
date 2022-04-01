export type CurriedFn<T> = (...args: any[]) => T | CurriedFn<T>

export const curry = <T>(fn: (...args: any[]) => T, ...args: any[]): T | CurriedFn<T> => {
  return args.length >= fn.length ? fn(...args) : (...newArgs: any[]) => curry(fn, ...args, ...newArgs)
}
