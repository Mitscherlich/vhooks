import type { DependencyList } from '@m9ch/vhooks-types'

export function depsAreSame(oldDeps: DependencyList, deps: DependencyList): boolean {
  if (oldDeps === deps)
    return true
  for (let i = 0; i < (oldDeps as any[]).length; i++) {
    if (!Object.is(oldDeps[i], deps[i]))
      return false
  }

  return true
}
