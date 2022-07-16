import type { DefineComponent, Ref } from 'vue-demi'
import { defineComponent, h } from 'vue-demi'
import { useRef } from '../core'

export const forwardRef = <P>(Component: DefineComponent<P>) => {
  const ForwardRef = defineComponent<P>((props, context) => {
    const ref = useRef()

    context.expose(ref.value)

    return () => {
      const componentProps: Readonly<P> & { ref: Ref<any> } = {
        ref, ...props,
      }

      return h(Component, componentProps, context.slots)
    }
  })
  ForwardRef.name = 'ForwardRefWrap'
  ForwardRef.props = Component.props
  ForwardRef.emits = Component.emits
  ForwardRef.slots = Component.slots

  return ForwardRef
}
