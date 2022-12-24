import { act, renderHook } from '@m9ch/vhooks-test-utils'
import { describe, expect, it } from 'vitest'
import { unref } from 'vue'
import { createDeepCompareEffect } from '../index'
import useEffect from '../../useEffect'
import useState from '../../useState'

describe('createDeepCompareEffect', () => {
  it('should work for useEffect', async () => {
    const useDeepCompareEffect = createDeepCompareEffect(useEffect)

    const hook = renderHook(() => {
      const [x, setX] = useState(0)
      const [y, setY] = useState({ foo: 'foo', bar: ['baz'] })
      useDeepCompareEffect(() => {
        setX(prevX => prevX + 1)
      }, [y])
      return { x, setY }
    })

    expect(unref(hook.result.current.x)).toBe(1)

    await act(async () => {
      hook.result.current.setY({ foo: 'foo', bar: ['baz'] })
    })

    expect(unref(hook.result.current.x)).toBe(1)

    await act(async () => {
      hook.result.current.setY({ foo: 'foo', bar: ['bazz'] })
    })

    expect(unref(hook.result.current.x)).toBe(2)
  })

  // it('deps is undefined should rerender in useEffect', async () => {
  //   const useDeepCompareLayoutEffect = createDeepCompareEffect(useEffect)
  //   let count = 0
  //   const hook = renderHook(() => {
  //     useDeepCompareLayoutEffect(() => {
  //       count++
  //     })
  //   })

  //   expect(count).toBe(1)
  //   await hook.rerender()
  //   expect(count).toBe(2)
  //   await hook.rerender()
  //   expect(count).toBe(3)
  // })
})
