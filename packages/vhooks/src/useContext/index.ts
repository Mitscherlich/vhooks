import type { MaybeRef } from '@m9ch/vhooks-types'
import type {
  DefineComponent,
  InjectionKey,
} from 'vue-demi'
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

export const createContext = <T>(defaultValue: MaybeRef<T>, contextId?: ContextId<T>) => {
  const context: any = {
    _contextId: contextId ?? Symbol.for('@@default'),
    _contextValue: defaultValue,
  }

  const Provider = defineComponent({
    name: 'Context.Provider',
    props: ['value'],
    setup(props, context) {
      const { value } = toRefs(props)
      const contextValue = computed(() => ({
        value: value.value ?? defaultValue,
      }))
      provide(contextId, toReactive(contextValue))
      return () => context.slots.default?.()
    },
  })

  const Consumer = defineComponent({
    name: 'Context.Consumer',
    functional: true,
    render() {
      const contextValue = inject(contextId)
      return this.$slots.default?.(contextValue)
    },
  })

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
