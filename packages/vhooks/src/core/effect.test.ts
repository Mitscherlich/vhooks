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

test('useEffect should run only once if deps is empty', async() => {
  const fn_1 = vitest.fn()
  const fn_2 = vitest.fn()

  const dep = useRef(1)

  renderHook(() => {
    useEffect(fn_1, [dep])
    useEffect(fn_2, [])
  })

  expect(fn_1).toHaveBeenCalledTimes(1)
  expect(fn_2).toHaveBeenCalledTimes(1)

  dep.value = 2

  await nextTick()

  expect(fn_1).toHaveBeenCalledTimes(2)
  expect(fn_2).toHaveBeenCalledTimes(1)
})

test('useEffect should call cleanup if return a function', async() => {
  const fn = vitest.fn()

  const dep = useRef(1)

  renderHook(() => {
    useEffect(() => fn, [dep])
  })

  expect(fn).not.toHaveBeenCalled()

  dep.value = 2

  await nextTick()

  expect(fn).toHaveBeenCalled()
})

test('useEffect should call cleanup once after component dispose if deps is empty', async() => {
  const fn_1 = vitest.fn()
  const fn_2 = vitest.fn()

  const dep = useRef(1)

  const component = renderHook(() => {
    useEffect(() => fn_1, [dep])
    useEffect(() => fn_2, [])
  })

  dep.value = 2

  await nextTick()

  expect(fn_1).toHaveBeenCalled()
  expect(fn_2).not.toHaveBeenCalled()

  component.unmount()

  expect(fn_1).toHaveBeenCalledTimes(2)
  expect(fn_2).toHaveBeenCalledTimes(1)
})
