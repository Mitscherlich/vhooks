export const pipe = <T>(...fns: ((x: T) => T)[]): (x: T) => T => {
  return fns.reduce((f, g) => x => g(f(x)))
}
