import { act, renderHook } from '@m9ch/vhooks-test-utils'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import type { Options } from '../index'
import useCountDown from '../index'

const setup = (options: Options = {}) => {
  return renderHook((props: Options = options) => useCountDown(props))
}

describe('useCountDown', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(1479427200000)
  })
  afterAll(() => {
    vi.useRealTimers()
  })

  it('should initialize correctly with undefined targetDate', () => {
    const { result } = setup()

    const [count, formattedRes] = result.current

    expect(count.value).toBe(0)
    expect(formattedRes.value).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    })
  })

  it('should initialize correctly with correct targetDate', () => {
    const { result } = setup({
      targetDate: Date.now() + 5000,
      interval: 1000,
    })
    const [count, formattedRes] = result.current
    expect(count.value).toBe(5000)
    expect(formattedRes.value.seconds).toBe(5)
    expect(formattedRes.value.milliseconds).toBe(0)
  })

  // it('should work manually', async () => {
  //   const { result, rerender } = setup({ interval: 100 })

  //   console.log('111')
  //   await rerender({ targetDate: Date.now() + 5000, interval: 1000 })
  //   console.log('222')
  //   expect(result.current[0].value).toBe(5000)
  //   expect(result.current[1].value.seconds).toBe(5)

  //   await act(() => {
  //     vi.advanceTimersByTime(1000)
  //   })
  //   expect(result.current[0].value).toBe(4000)
  //   expect(result.current[1].value.seconds).toBe(4)

  //   await act(() => {
  //     vi.advanceTimersByTime(4000)
  //   })
  //   expect(result.current[0].value).toEqual(0)
  //   expect(result.current[1].value.seconds).toBe(0)

  //   await act(() => {
  //     vi.advanceTimersByTime(1000)
  //   })

  //   expect(result.current[0].value).toEqual(0)
  //   expect(result.current[1].value.seconds).toBe(0)
  // })

  it('should work automatically', async () => {
    const { result } = setup({
      targetDate: Date.now() + 5000,
      interval: 1000,
    })

    expect(result.current[0].value).toBe(5000)
    expect(result.current[1].value.seconds).toBe(5)

    await act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current[0].value).toBe(4000)
    expect(result.current[1].value.seconds).toBe(4)

    await act(() => {
      vi.advanceTimersByTime(4000)
    })
    expect(result.current[0].value).toBe(0)
    expect(result.current[1].value.seconds).toBe(0)
  })

  // it('should work stop', () => {
  //   const { result, rerender } = setup({
  //     targetDate: Date.now() + 5000,
  //     interval: 1000,
  //   })

  //   rerender({
  //     targetDate: Date.now() + 5000,
  //     interval: 1000,
  //   })
  //   expect(result.current[0]).toBe(5000)
  //   expect(result.current[1].seconds).toBe(5)

  //   act(() => {
  //     vi.advanceTimersByTime(1000)
  //   })
  //   expect(result.current[0]).toBe(4000)
  //   expect(result.current[1].seconds).toBe(4)

  //   rerender({
  //     targetDate: undefined,
  //   })
  //   expect(result.current[0]).toBe(0)
  //   expect(result.current[1].seconds).toBe(0)
  // })

  it('it onEnd should work', async () => {
    const onEnd = vi.fn()
    setup({
      targetDate: Date.now() + 5000,
      interval: 1000,
      onEnd,
    })
    await act(() => {
      vi.advanceTimersByTime(6000)
    })
    expect(onEnd).toBeCalled()
  })

  it('timeLeft should be 0 when target date less than current time', () => {
    const { result } = setup({
      targetDate: Date.now() - 5000,
    })
    expect(result.current[0].value).toBe(0)
  })

  it('should initialize correctly with undefined leftTime', () => {
    const { result } = setup()

    const [count, formattedRes] = result.current

    expect(count.value).toBe(0)
    expect(formattedRes.value).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    })
  })

  it('should initialize correctly with correct leftTime', () => {
    const { result } = setup({ leftTime: 5 * 1000, interval: 1000 })
    const [count, formattedRes] = result.current
    expect(count.value).toBe(5000)
    expect(formattedRes.value.seconds).toBe(5)
    expect(formattedRes.value.milliseconds).toBe(0)
  })

  // it('should work manually', () => {
  //   const { result, rerender } = setup({ interval: 100 })

  //   rerender({ leftTime: 5 * 1000, interval: 1000 })
  //   expect(result.current[0]).toBe(5000)
  //   expect(result.current[1].seconds).toBe(5)

  //   act(() => {
  //     vi.advanceTimersByTime(1000)
  //   })
  //   expect(result.current[0]).toBe(4000)
  //   expect(result.current[1].seconds).toBe(4)

  //   act(() => {
  //     vi.advanceTimersByTime(4000)
  //   })
  //   expect(result.current[0]).toEqual(0)
  //   expect(result.current[1].seconds).toBe(0)

  //   act(() => {
  //     vi.advanceTimersByTime(1000)
  //   })

  //   expect(result.current[0]).toEqual(0)
  //   expect(result.current[1].seconds).toBe(0)
  // })

  it('should work automatically', async () => {
    const { result } = setup({ leftTime: 5 * 1000, interval: 1000 })

    expect(result.current[0].value).toBe(5000)
    expect(result.current[1].value.seconds).toBe(5)

    await act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current[0].value).toBe(4000)
    expect(result.current[1].value.seconds).toBe(4)

    await act(() => {
      vi.advanceTimersByTime(4000)
    })
    expect(result.current[0].value).toBe(0)
    expect(result.current[1].value.seconds).toBe(0)
  })

  // it('should work stop', () => {
  //   const { result, rerender } = setup({ leftTime: 5 * 1000, interval: 1000 })

  //   rerender({ leftTime: 5 * 1000, interval: 1000 })
  //   expect(result.current[0]).toBe(5000)
  //   expect(result.current[1].seconds).toBe(5)

  //   act(() => {
  //     vi.advanceTimersByTime(1000)
  //   })
  //   expect(result.current[0]).toBe(4000)
  //   expect(result.current[1].seconds).toBe(4)

  //   rerender({ leftTime: undefined })
  //   expect(result.current[0]).toBe(0)
  //   expect(result.current[1].seconds).toBe(0)
  // })

  it('it onEnd should work', async () => {
    const onEnd = vi.fn()
    setup({ leftTime: 5 * 1000, interval: 1000, onEnd })
    await act(() => {
      vi.advanceTimersByTime(6000)
    })
    expect(onEnd).toBeCalled()
  })

  it('timeLeft should be 0 when leftTime less than current time', () => {
    const { result } = setup({ leftTime: -5 * 1000 })
    expect(result.current[0].value).toBe(0)
  })
})
