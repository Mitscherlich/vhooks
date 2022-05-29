export const toArray = <T>(val: T | T[]): T[] => Array.isArray(val) ? val : [val]

export const remove = <T>(arr: T[], el: T): void => {
  const i = arr.indexOf(el)
  if (i > -1)
    arr.splice(i, 1)
}
