import { renderHook, sleep } from '@m9ch/vhooks-test-utils'
import useRef from '../../useRef'
import useLockFn from '../index'

describe('useLockFn', () => {
  const setUp = (): any =>
    renderHook(() => {
      const countRef = useRef(0)
      const persistFn = async (step: number) => {
        countRef.value += step
        await sleep(50)
      }
      const locked = useLockFn(persistFn)

      return {
        locked,
        countRef,
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
})
