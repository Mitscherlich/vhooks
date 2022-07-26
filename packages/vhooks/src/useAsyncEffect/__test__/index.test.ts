import { act, renderHook } from '@m9ch/vhooks-test-utils'
import { sleep } from '@m9ch/vhooks-utils'
import { unref } from 'vue'
import useAsyncEffect from '../index'
import useState from '../../useState'

describe('useAsyncEffect', () => {
  it('should work without clean up', async () => {
    const hook = renderHook(() => {
      const [x, setX] = useState(0)
      useAsyncEffect(async () => {
        await sleep(100)
        setX(1)
      }, [])
      return x
    })
    expect(unref(hook.result.current)).toBe(0)
    await act(async () => {
      await sleep(150)
    })
    expect(unref(hook.result.current)).toBe(1)
  })

  it('should work with yield break', async () => {
    const hook = renderHook(() => {
      const [x, setX] = useState(1)
      const [y, setY] = useState(0)
      useAsyncEffect(
        async function* () {
          await sleep(100)
          yield
          setY(x.value)
        },
        [x],
      )
      return {
        y,
        setX,
      }
    })
    expect(unref(hook.result.current.y)).toBe(0)

    await act(async () => {
      await sleep(50)
      hook.result.current.setX(2)
    })
    expect(unref(hook.result.current.y)).toBe(0)

    await act(async () => {
      await sleep(20)
    })
    expect(unref(hook.result.current.y)).toBe(0)

    await act(async () => {
      await sleep(50)
      hook.result.current.setX(3)
    })
    expect(unref(hook.result.current.y)).toBe(0)

    await act(async () => {
      await sleep(80)
    })
    expect(unref(hook.result.current.y)).toBe(0)

    await act(async () => {
      await sleep(50)
    })
    expect(unref(hook.result.current.y)).toBe(3)
  })
})
