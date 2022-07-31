import { act, renderHook } from '@m9ch/vhooks-test-utils'
import useDeepCompareEffect from '../index'
import useState from '../../useState'

describe('useDeepCompareEffect', () => {
  it('test deep compare', async () => {
    const hook = renderHook(() => {
      const [x, setX] = useState(0)
      const [y, setY] = useState({})
      useDeepCompareEffect(() => {
        setX(x => x + 1)
      }, [y])
      return { x, setY }
    })
    expect(hook.result.current.x.value).toBe(1)

    await act(async () => {
      hook.result.current.setY({})
    })
    expect(hook.result.current.x.value).toBe(1)
  })
})
