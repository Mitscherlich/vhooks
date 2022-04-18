import { isRef } from 'vue-demi'
import { useMemo } from './memo'

test('useMemo should return a ref', () => {
  const fn = vitest.fn()
  const deps = [1, 2, 3]
  const ref = useMemo(fn, deps)
  expect(isRef(ref)).toBe(true)
})
