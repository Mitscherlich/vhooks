import { defineComponent, h } from 'vue'
import type { RendererProps } from '../types'

export function createTestHarness<TProps, TResult>(
  { callback, setValue, setError }: RendererProps<TProps, TResult>,
) {
  const TestComponent = defineComponent<{ hookProps?: TProps }>(props => () => {
    const { hookProps } = props
    setValue(callback(hookProps as TProps))
    return null
  })
  TestComponent.props = ['hookProps']

  const testHarness = (props?: TProps) => {
    try {
      return h(TestComponent, { hookProps: props })
    }
    catch (e) {
      setError(e)
      return null
    }
  }

  return testHarness
}
