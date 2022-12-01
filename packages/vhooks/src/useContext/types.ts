import type {
  ComputedRef,
  InjectionKey,
} from 'vue'

import type { createContext } from './index'

export type ContextId<T> = InjectionKey<ComputedRef<T>>

type CreateContext<T> = typeof createContext<T>

export type Context<T> = ReturnType<CreateContext<T>>
