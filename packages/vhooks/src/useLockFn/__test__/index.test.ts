import { /* act, */ renderHook, sleep } from '@m9ch/vhooks-test-utils'
import useCallback from '../../useCallback'
import useRef from '../../useRef'
import useState from '../../useState'
import useLockFn from '../index'

describe('useLockFn', () => {
  const setUp = (): any =>
    renderHook(() => {
      const [tag, updateTag] = useState(false)
      const countRef = useRef(0)
      const persistFn = useCallback(
        async (step: number) => {
          countRef.value += step
          await sleep(50)
        },
        [tag],
      )
      const locked = useLockFn(persistFn)

      return {
        locked,
        countRef,
        updateTag: () => updateTag(true),
      }
    })

  it('should work', async () => {
    const hook = setUp()
    const { locked, countRef } = hook.result.current
    locked(1)
    expect(countRef.value).toBe(1)
    locked(2)
    expect(countRef.value).toBe(1)
    await sleep(30)
    locked(3)
    expect(countRef.value).toBe(1)
    await sleep(30)
    locked(4)
    expect(countRef.value).toBe(5)
    locked(5)
    expect(countRef.value).toBe(5)
  })

  // it('should same', () => {
  //   const hook = setUp()
  //   const preLocked = hook.result.current.locked
  //   hook.rerender()
  //   expect(hook.result.current.locked).toEqual(preLocked)
  //   act(hook.result.current.updateTag)
  //   expect(hook.result.current.locked).not.toEqual(preLocked)
  // })
})
