import { render } from '@testing-library/vue'
import { defineComponent } from 'vue'

export const renderHook = (pure: Function) => {
  const TestComponent = defineComponent((props) => {
    pure(props)
    return () => null
  })
  return render(TestComponent)
}
