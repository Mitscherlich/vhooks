import { nextTick } from 'vue-demi'
import { useRef } from './ref'
import { useLayoutEffect } from './layoutEffect'

test('useLayoutEffect should return a stop function', () => {
  const stop = useLayoutEffect(() => {}, [])
  expect(stop).toBeInstanceOf(Function)
})

test('useLayoutEffect should take a function and deps array and call function right after deps changed', async() => {
  const fn = vitest.fn()
  const ref = useRef(1)
  const deps = [ref]

  useLayoutEffect(fn, deps)

  expect(fn).not.toHaveBeenCalled()
  ref.value = 2
  await nextTick()
  expect(fn).toHaveBeenCalled()
})
