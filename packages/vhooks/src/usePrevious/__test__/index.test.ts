import { renderHook } from '@m9ch/vhooks-test-utils'
import { describe, expect, it } from 'vitest'
import type { ShouldUpdateFunc } from '../index'
import usePrevious from '../index'

describe('usePrevious', () => {
  function getHook<T>(initialValue?: T, compareFunction?: ShouldUpdateFunc<T>) {
    return renderHook(({ val, cmp }) => usePrevious<T>(val as T, cmp), {
      initialProps: {
        val: initialValue || 0,
        cmp: compareFunction,
      } as { val?: T; cmp?: ShouldUpdateFunc<T> },
    })
  }

  it('should return undefined on init', () => {
    expect(getHook().result.current.value).toBeUndefined()
  })

  // it('should update previous value only after render with different value', () => {
  //   const hook = getHook(0, () => true)

  //   expect(hook.result.current.value).toBeUndefined()
  //   hook.rerender({ val: 1 })
  //   expect(hook.result.current.value).toBe(0)

  //   hook.rerender({ val: 2 })
  //   expect(hook.result.current.value).toBe(1)

  //   hook.rerender({ val: 3 })
  //   expect(hook.result.current.value).toBe(2)

  //   hook.rerender({ val: 4 })
  //   expect(hook.result.current.value).toBe(3)

  //   hook.rerender({ val: 5 })
  //   expect(hook.result.current.value).toBe(4)
  // })

  // it('should work fine with `undefined` values', () => {
  //   const hook = renderHook(({ value }) => usePrevious(value), {
  //     initialProps: { value: undefined as undefined | number },
  //   })

  //   expect(hook.result.current.value).toBeUndefined()

  //   hook.rerender({ value: 1 })
  //   expect(hook.result.current.value).toBeUndefined()

  //   hook.rerender({ value: undefined })
  //   expect(hook.result.current.value).toBe(1)

  //   hook.rerender({ value: 2 })
  //   expect(hook.result.current.value).toBeUndefined()
  // })

  // it('should receive a predicate as a second parameter that will compare prev and current', () => {
  //   const obj1 = { label: 'John', value: 'john' }
  //   const obj2 = { label: 'Jonny', value: 'john' }
  //   const obj3 = { label: 'Kate', value: 'kate' }
  //   interface Obj { label: string; value: string }
  //   const predicate = (a: Obj | undefined, b: Obj) => (a ? a.value !== b.value : true)

  //   const hook = getHook(obj1 as Obj, predicate)

  //   expect(hook.result.current.value).toBeUndefined()

  //   hook.rerender({ val: obj2, cmp: predicate })

  //   expect(hook.result.current.value).toBeUndefined()

  //   hook.rerender({ val: obj3, cmp: predicate })

  //   expect(hook.result.current.value).toBe(obj1)
  // })
})
