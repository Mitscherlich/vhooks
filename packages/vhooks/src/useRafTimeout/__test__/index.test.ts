import { renderHook } from '@m9ch/vhooks-test-utils'
import useRafTimeout from '../index'

interface ParamsObj {
  fn: (...arg: any) => any
  delay: number | undefined
}

const setUp = ({ fn, delay }: ParamsObj) => renderHook(() => useRafTimeout(fn, delay))

const FRAME_TIME = 16.7
describe('useRafTimeout', () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })
  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('timeout should work', () => {
    const callback = vi.fn()
    setUp({ fn: callback, delay: FRAME_TIME })
    expect(callback).not.toBeCalled()
    vi.advanceTimersByTime(FRAME_TIME * 2.5)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('timeout should stop when delay is undefined', () => {
    const delay: number | undefined = undefined
    const callback = vi.fn()
    setUp({ fn: callback, delay })
    expect(callback).not.toBeCalled()
    vi.advanceTimersByTime(FRAME_TIME * 1.5)
    expect(callback).not.toBeCalled()
  })

  it('timeout should be clear', () => {
    const callback = vi.fn()

    const hook = setUp({ fn: callback, delay: FRAME_TIME })
    expect(callback).not.toBeCalled()

    hook.result.current()
    vi.advanceTimersByTime(FRAME_TIME * 2.5)
    expect(callback).toHaveBeenCalledTimes(0)
  })
})
