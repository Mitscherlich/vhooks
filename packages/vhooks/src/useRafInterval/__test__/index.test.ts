import { renderHook } from '@m9ch/vhooks-test-utils'
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

  it('interval should work', () => {
    const callback = vi.fn()
    setUp({ fn: callback, delay: FRAME_TIME })
    expect(callback).not.toBeCalled()
    vi.advanceTimersByTime(FRAME_TIME * 2.5)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('delay is undefined should stop', () => {
    const delay: number | undefined = undefined
    const callback = vi.fn()
    setUp({ fn: callback, delay })
    expect(callback).not.toBeCalled()
    vi.advanceTimersByTime(FRAME_TIME * 1.5)
    expect(callback).not.toBeCalled()
  })

  it('immediate in options should work', () => {
    const callback = vi.fn()
    setUp({ fn: callback, delay: FRAME_TIME, options: { immediate: true } })
    expect(callback).toBeCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(FRAME_TIME * 1.5)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('interval should be clear', () => {
    const callback = vi.fn()
    const hook = setUp({ fn: callback, delay: FRAME_TIME })

    expect(callback).not.toBeCalled()

    hook.result.current()
    vi.advanceTimersByTime(FRAME_TIME * 2.5)
    // not to be called
    expect(callback).toHaveBeenCalledTimes(0)
  })
})
