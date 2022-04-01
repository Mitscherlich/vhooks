import { curry } from './curry'

test('curry should return a monad function', () => {
  const fn = (x: number, y: number) => x + y
  const result = curry(fn)(1, 2)
  expect(result).toEqual(3)
})
