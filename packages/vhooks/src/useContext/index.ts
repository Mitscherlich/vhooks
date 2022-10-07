import type { MaybeRef } from '@m9ch/vhooks-types'
import type { DefineComponent, InjectionKey } from 'vue-demi'
import {
  computed,
  defineComponent,
  inject,
  provide,
  toRefs,
} from 'vue-demi'
import useLatest from '../useLatest'
import { toReactive } from '../utils/toReactive'

export type ContextId<T> = InjectionKey<{ value: T }>

export interface Context<T> {
  _contextId: ContextId<T>
  _contextValue: MaybeRef<T>
  Provider: DefineComponent<{ value: MaybeRef<T> }>
  Consumer: DefineComponent<{}>
}

export const createContext = <T>(defaultValue: MaybeRef<T>, contextId: ContextId<T> = Symbol.for('@@default')) => {
  const context: any = {
    _contextId: contextId,
    _contextValue: defaultValue,
  }

  const Provider = defineComponent<{ value?: MaybeRef<T> }>((props, ctx) => {
    const { value } = toRefs(props)
    const contextValue = computed(() => ({
      value: value.value ?? defaultValue,
    }))
    provide(contextId, toReactive(contextValue))

    return () => ctx.slots.default?.()
  })
  Provider.name = 'Context.Provider'
  Provider.props = ['value']

  const Consumer = defineComponent<{}>((_, ctx) => {
    const contextValue = inject(contextId)
    return () => ctx.slots.default?.(contextValue.value)
  })
  Consumer.name = 'Context.Consumer'

  context.Provider = Provider
  context.Consumer = Consumer

  return context as Context<T>
}

function useContext<T>(context: Context<T>) {
  const contextValue = inject(context._contextId)
  const { value } = toRefs(contextValue)
  return useLatest(value)
}

export default useContext
