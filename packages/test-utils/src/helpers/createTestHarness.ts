import type { RenderOptions } from '@testing-library/vue'
import { render } from '@testing-library/vue'
import { defineComponent } from 'vue'
import type { RendererProps } from '../types'

export function createTestHarness<TProps, TResult>(
  { callback, setValue, setError }: RendererProps<TProps, TResult>,
) {
  const TestComponent = defineComponent<{ hookProps?: TProps }>((props) => {
    setValue(callback(props.hookProps as TProps))
    return () => null
  })
  TestComponent.props = ['hookProps']

  const testHarness = (props?: TProps, { container }: RenderOptions = {}) => {
    try {
      return render(TestComponent, {
        props: {
          hookProps: props,
        },
        container,
      })
    }
    catch (e) {
      setError(e)
      return null
    }
  }

  return testHarness
}
