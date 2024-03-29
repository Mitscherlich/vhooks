import type { RenderHookResult } from '@m9ch/vhooks-test-utils'
import { act, renderHook, sleep } from '@m9ch/vhooks-test-utils'
import useDebounceFn from '../index'

interface ParamsObj {
  fn: (...arg: any) => any
  deps?: any[]
  wait: number
}

let count = 0
function debounceFn(gap: number) {
  count += gap
}

const setUp = ({ fn, wait }: ParamsObj) => renderHook(() => useDebounceFn(fn, { wait }))

let hook: RenderHookResult<ParamsObj, ReturnType<typeof useDebounceFn>>

describe('useDebounceFn', () => {
  it('run, cancel and flush should work', async () => {
    act(() => {
      hook = setUp({
        fn: debounceFn,
        wait: 200,
      })
    })
    await act(async () => {
      hook.result.current.run(2)
      hook.result.current.run(2)
      hook.result.current.run(2)
      hook.result.current.run(2)
      expect(count).toBe(0)
      await sleep(300)
      expect(count).toBe(2)

      hook.result.current.run(4)
      expect(count).toBe(2)
      await sleep(300)
      expect(count).toBe(6)

      hook.result.current.run(4)
      expect(count).toBe(6)
      hook.result.current.cancel()
      expect(count).toBe(6)
      await sleep(300)
      expect(count).toBe(6)

      hook.result.current.run(1)
      expect(count).toBe(6)
      hook.result.current.flush()
      expect(count).toBe(7)
      await sleep(300)
      expect(count).toBe(7)
    })
  })
})
