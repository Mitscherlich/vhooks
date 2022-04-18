import type { Context, MaybeRef, ProviderProps } from '@m9ch/vhooks-types'
import type { InjectionKey, Ref } from 'vue-demi'
import { defineComponent, inject, provide, unref, watch } from 'vue-demi'

export const createContext = <T>(defaultValue: MaybeRef<T>, contextId: InjectionKey<Ref<T>> = Symbol('@@defaultContext')): Context<T> => {
  const context: any = {
    _context: unref(defaultValue),
    _contextId: contextId,
  }

  context.Provider = defineComponent<ProviderProps<T>>((props, ctx) => {
    watch([props.value], (contextValue) => {
      context._context = contextValue
    }, { immediate: true })
    provide(context._contextId, context._context)
    return () => ctx.slots.default?.()
  })
  context.Provider.props = ['value'] // for any type

  context.Consumers = defineComponent((_, ctx) => {
    const refVal = inject(context._contextId)
    return () => ctx.slots.default?.(refVal)
  })

  return context as Context<T>
}

export const useContext = <T>(context: Context<T>): Ref<T> => {
  return inject(context._contextId)
}
