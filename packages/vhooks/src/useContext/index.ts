import { defineComponent, inject, provide, readonly, ref, toRef } from 'vue-demi'
import type { Context, ContextId } from './types'

export function createContext<T>(defaultValue?: T): Context<T> {
  const contextId: ContextId<T> = Symbol('@@Context')

  return {
    Provider: defineComponent({
      name: 'ContextProvider',
      props: {
        value: {
          type: null,
          default() {
            return defaultValue ?? null
          },
        },
      },
      setup(props, { slots }) {
        const value: any = toRef(props, 'value' as never)
        provide(contextId, readonly(value))

        return () => slots?.default?.()
      },
    }),

    Consumer: defineComponent({
      name: 'ContextConsumer',
      setup(_props, { slots }) {
        const value = inject(contextId)

        return () => slots?.default?.(value)
      },
    }),

    contextId,
  }
}

export default function useContext<T>(context: Context<T>) {
  const key = context.contextId

  return inject(key, ref(null))
}

export {
  type Context,
  type ContextId,
}
