import type { DefineComponent, InjectionKey, Ref } from 'vue'

export type ContextId<T> = InjectionKey<Ref<T>>

export interface Context<T> {
  Provider: DefineComponent
  Consumer: DefineComponent
  contextId: ContextId<T>
}
