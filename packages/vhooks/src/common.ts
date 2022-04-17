import type { HookType } from './types/Tags'

let currentHook = 0

export const getHookState = (index: number, type: HookType) => {
  currentHook = 0
}
