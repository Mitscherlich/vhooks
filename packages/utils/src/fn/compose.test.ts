import { compose } from './compose'

test('compose should call fns right to left', () => {
  const f1 = (x: number) => x + 1
  const f2 = (x: number) => x * 2
  const f3 = (x: number) => x - 1
  const result = compose(f1, f2, f3)(1)
  expect(result).toEqual(1)
})
