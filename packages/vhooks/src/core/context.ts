import type { Context, MaybeRef, ProviderProps } from '@m9ch/vhooks-types'
import type { InjectionKey } from 'vue-demi'
import { defineComponent, inject, provide, toRefs, unref, watch } from 'vue-demi'

/**
 * similar to `React.createContext`
 */
export const createContext = <T>(defaultValue: MaybeRef<T>, contextId: InjectionKey<T> = Symbol('@@defaultContext')): Context<T> => {
  const context: Partial<Context<T>> = {
    _context: unref(defaultValue),
    _contextId: contextId,
  }

  context.Provider = defineComponent<ProviderProps<T>>((props, ctx) => {
    const { value } = toRefs(props)
    watch([value], ([contextValue]) => {
      context._context = contextValue
    }, { immediate: true })
    provide(context._contextId, context._context)
    return () => ctx.slots.default?.()
  })
  context.Provider.name = 'Context.Provider'
  context.Provider.props = ['value'] // for any type

  context.Consumer = defineComponent((_, ctx) => {
    const refVal = inject(context._contextId)
    return () => ctx.slots.default?.(refVal)
  })
  context.Consumer.name = 'Context.Consumer'

  return context as Context<T>
}

/**
 * similar to `React.useContext`
 */
export const useContext = <T>(context: Context<T>): MaybeRef<T> => {
  return inject(context._contextId)
}
