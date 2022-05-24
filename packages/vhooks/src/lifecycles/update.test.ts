import { renderHook } from '@m9ch/vhooks-test-utils'
import { nextTick } from 'vue'
import { useRef } from '../core'
import { useUpdate } from './update'

describe('useUpdate', () => {
  it('should return a stop function', () => {
    const stop = useUpdate(() => {}, [])
    expect(stop).toBeInstanceOf(Function)
  })

  it('should call effect function only after deps changed', async() => {
    const fn = vitest.fn()
    const dummy = useRef(1)
    const deps = [dummy]

    renderHook(() => {
      useUpdate(fn, deps)
    })

    expect(fn).not.toHaveBeenCalled()

    dummy.value = 2
    await nextTick()

    expect(fn).toHaveBeenCalled()
  })
})
