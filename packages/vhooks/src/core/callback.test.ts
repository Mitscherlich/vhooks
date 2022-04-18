import { isRef } from 'vue-demi'
import { useCallback } from './callback'

test('useCallback should return a ref', () => {
  const fn = vitest.fn()
  const deps = [1, 2, 3]
  const ref = useCallback(fn, deps)
  expect(isRef(ref)).toBe(true)
})
