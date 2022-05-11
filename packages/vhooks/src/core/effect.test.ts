import { renderHook } from '@m9ch/vhooks-test-utils'
import { nextTick } from 'vue'
import { useRef } from './ref'
import { useEffect } from './effect'

test('useEffect should return a stop function', () => {
  const stop = useEffect(() => {}, [])
  expect(stop).toBeInstanceOf(Function)
})

test('useEffect should take a function and deps array and call function after deps changed', async() => {
  const fn = vitest.fn()
  const ref = useRef(1)
  const deps = [ref]

  useEffect(fn, deps)

  expect(fn).not.toHaveBeenCalled()
  ref.value = 2
  await nextTick()
  expect(fn).toHaveBeenCalled()
})

test('useEffect should always call function if no deps array provided', () => {
  const fn = vitest.fn()

  renderHook(() => {
    useEffect(fn)
  })

  expect(fn).toHaveBeenCalled()
})
