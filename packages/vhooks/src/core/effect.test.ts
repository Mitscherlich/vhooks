import { useEffect } from './effect'

test('useEffect should run immediate if no Vue instance present', () => {
  const fn = vitest.fn()
  useEffect(fn, [])
  expect(fn).toBeCalled()
})
