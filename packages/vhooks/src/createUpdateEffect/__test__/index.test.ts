import { act, renderHook } from '@m9ch/vhooks-test-utils'
import { describe, expect, it } from 'vitest'
import { createUpdateEffect } from '../index'
import useEffect from '../../useEffect'
import useState from '../../useState'

describe('createUpdateEffect', () => {
  it('should work for useEffect', async () => {
    const useUpdateEffect = createUpdateEffect(useEffect)

    let mountedState = 1
    const hook = renderHook(() => {
      const [x, setX] = useState(0)

      useUpdateEffect(() => {
        mountedState = 2
      }, [x])

      return { x, setX }
    })
    expect(mountedState).toEqual(1)
    await act(() => {
      hook.result.current.setX(1)
    })
    expect(mountedState).toEqual(2)
  })
})
