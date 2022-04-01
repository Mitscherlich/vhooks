export const compose = <T>(...fns: ((x: T) => T)[]): (x: T) => T => {
  return fns.reduce((f, g) => x => f(g(x)))
}
