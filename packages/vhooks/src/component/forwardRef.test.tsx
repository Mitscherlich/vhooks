import { render } from '@m9ch/vhooks-test-utils'
import { defineComponent } from 'vue-demi'

import { forwardRef } from './forwardRef'

describe('forwardRef', () => {
  const Inner = defineComponent((props: { msg: string }, context) => {
    context.expose({
      foo: 'bar',
    })
    return () => <div data-testid="content">{props.msg}</div>
  })
  Inner.props = ['msg']

  const Outer = forwardRef(Inner)

  it('should expose Inner ref to Outer', () => {
    const { getByTestId } = render(<Outer msg="hello" />)
    expect(getByTestId('content').textContent).toBe('hello')
  })
})
