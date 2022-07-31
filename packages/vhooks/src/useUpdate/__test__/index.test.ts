import { act, renderHook } from '@m9ch/vhooks-test-utils'
import { onUpdated } from 'vue'
import useState from '../../useState'
import useUpdate from '../index'

describe('useUpdate', () => {
  it('should update', async () => {
    const hooks = renderHook(() => {
      const [count, setCount] = useState(0)
      const update = useUpdate()
      onUpdated(() => {
        setCount(count => count + 1)
      })
      return {
        update,
        count,
      }
    })
    expect(hooks.result.current.count.value).toEqual(0)
    await act(hooks.result.current.update)
    expect(hooks.result.current.count.value).toEqual(1)
  })

  // it('should return same update function', () => {
  //   const hooks = renderHook(() => useUpdate())
  //   const preUpdate = hooks.result.current
  //   hooks.rerender()
  //   expect(hooks.result.current).toEqual(preUpdate)
  // })
})
