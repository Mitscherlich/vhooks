import { isRef } from 'vue-demi'
import { useMemo } from './memo'

test('useMemo should return a ref', () => {
  const fn = vitest.fn()
  const deps = [1, 2, 3]
  const ref = useMemo(fn, deps)
  expect(isRef(ref)).toBe(true)
})

test('useMemo should return a read-only ref', () => {
  const memo = useMemo(() => 1, [])
  // @ts-expect-error we are testing the behavior
  memo.value = 2
  expect(memo.value).toBe(1)
})
