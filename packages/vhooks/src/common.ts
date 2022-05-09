export const argsChanged = (oldArgs: any[], newArgs: any[]) => (
  !oldArgs
  || oldArgs.length !== newArgs.length
  || oldArgs.some((arg, index) => arg !== newArgs[index])
)
