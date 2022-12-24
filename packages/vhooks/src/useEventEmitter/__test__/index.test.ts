import { act, renderHook } from '@m9ch/vhooks-test-utils'
import { describe, expect, it } from 'vitest'
import useState from '../../useState'
import useEventEmitter from '../index'

describe('useEventEmitter', () => {
  const setUp = (): any =>
    renderHook(() => {
      const event$ = useEventEmitter<number>()
      const [count, setCount] = useState(0)
      event$.useSubscription((val) => {
        setCount(c => c + val)
      })
      event$.useSubscription((val) => {
        setCount(c => c + val + 10)
      })
      return {
        event$,
        count,
      }
    })

  it('emit and subscribe should work', async () => {
    const hook = setUp()

    await act(() => {
      hook.result.current.event$.emit(1)
    })
    expect(hook.result.current.count.value).toEqual(12)

    await act(() => {
      hook.result.current.event$.emit(2)
    })
    expect(hook.result.current.count.value).toEqual(26)
  })
})
