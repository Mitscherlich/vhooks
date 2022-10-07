import { act, renderHook } from '@m9ch/vhooks-test-utils'
import useState from '../index'

describe('useState', () => {
  const setup = (initialValue: any) =>
    renderHook(() => {
      const [state, setState] = useState(initialValue)
      return {
        state,
        setState,
      } as const
    })

  it('should support initialValue', () => {
    const hook = setup({
      hello: 'world',
    })
    expect(hook.result.current.state.value).toEqual({ hello: 'world' })
  })

  it('should support update', async () => {
    const hook = setup(0)
    await act(() => {
      hook.result.current.setState(5)
    })
    expect(hook.result.current.state.value).toEqual(5)
  })
})
