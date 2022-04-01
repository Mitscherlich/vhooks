import { pipe } from './pipe'

test('run should call each fn left to right', () => {
  const f1 = (x: number) => x + 1
  const f2 = (x: number) => x * 2
  const f3 = (x: number) => x - 1
  const result = pipe(f1, f2, f3)(1)
  expect(result).toEqual(3)
})
