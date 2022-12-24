import { act, renderHook } from '@m9ch/vhooks-test-utils'
import { describe, expect, it } from 'vitest'
import useRafState from '../index'

describe('useRafState', () => {
  it('should work', () => {
    const { result } = renderHook(() => useRafState(0))
    const [rafState, setRafState] = result.current
    expect(rafState.value).toBe(0)

    act(() => {
      setRafState(1)
      requestAnimationFrame(() => {
        expect(rafState.value).toBe(1)
      })
    })
  })
})
