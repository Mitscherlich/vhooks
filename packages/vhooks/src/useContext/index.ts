import type { MaybeRef } from '@m9ch/vhooks-types'
import type { SetupContext } from 'vue-demi'
import {
  computed, defineComponent, inject, unref,
} from 'vue-demi'

import type { Context, ContextId } from './types'

const defaultContextId: ContextId<any> = Symbol.for('defaultContext')

export function createContext<T>(
  defaultValue: MaybeRef<T>,
  contextId: ContextId<T> = defaultContextId,
) {
  const context = {
    _contextId: contextId,
    _contextValue: defaultValue,

    Provider: defineComponent({
      name: 'Context.Provider',
      provide() {
        const contextValue = computed(() => {
          return this.value ?? unref(context._contextValue)
        })
        return { [contextId as symbol]: contextValue }
      },
      inheritAttrs: false,
      props: ['value'],
      render() {
        return this.$slots.default?.()
      },
    }),
    Consumer: defineComponent({
      name: 'Context.Consumer',
      functional: true,
      inheritAttrs: false,
      render: (_: any, { slots }: SetupContext) => {
        const contextValue = inject(contextId, context._contextValue)
        return slots.default?.(unref(contextValue))
      },
    }),
  }

  return context
}

export default function useContext<T>(context: Context<T>) {
  return inject(context._contextId)
}

export type { Context, ContextId } from './types'
