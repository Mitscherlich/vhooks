import { renderHook } from '@m9ch/vhooks-test-utils'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import useRafInterval from '../index'

interface ParamsObj {
  fn: (...arg: any) => any
  delay: number | undefined
  options?: { immediate: boolean }
}

const setUp = ({ fn, delay, options }: ParamsObj) =>
  renderHook(() => useRafInterval(fn, delay, options))

const FRAME_TIME = 16
describe('useRafInterval', () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('should downgrade to setInterval when requestAnimationFrame is undefined', () => {
    const _requestAnimationFrame = global.requestAnimationFrame
    const _cancelAnimationFrame = global.cancelAnimationFrame

    // simulate nodejs environment
    // @ts-ignore
    delete global.requestAnimationFrame
    // @ts-ignore
    delete global.cancelAnimationFrame

    const callback = vi.fn()
    setUp({ fn: callback, delay: FRAME_TIME })
    expect(callback).not.toBeCalled()
    vi.advanceTimersByTime(FRAME_TIME * 1.5)
    expect(callback).toHaveBeenCalledTimes(1)

    global.requestAnimationFrame = _requestAnimationFrame
    global.cancelAnimationFrame = _cancelAnimationFrame
  })
})
