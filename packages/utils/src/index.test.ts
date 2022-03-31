import { compose, curry, remove, run, toArray } from './index'

test('toArray should convert non-array value to array', () => {
  const dummy = { foo: 'bar' }
  const result = toArray(dummy)
  expect(result).toEqual([dummy])
})

test('toArray should not convert array value', () => {
  const dummy = [{ foo: 'bar' }]
  const result = toArray(dummy)
  expect(result).toEqual(dummy)
})

test('remove should delete exist item in array', () => {
  const arr = [1, 2, 3]
  remove(arr, 2)
  expect(arr).toEqual([1, 3])
})

test('compose should call fns right to left', () => {
  const f1 = (x: number) => x + 1
  const f2 = (x: number) => x * 2
  const f3 = (x: number) => x - 1
  const result = compose(f1, f2, f3)(1)
  expect(result).toEqual(1)
})

test('run should call each fn left to right', () => {
  const f1 = (x: number) => x + 1
  const f2 = (x: number) => x * 2
  const f3 = (x: number) => x - 1
  const result = run(f1, f2, f3)(1)
  expect(result).toEqual(3)
})

test('curry should return a monad function', () => {
  const fn = (x: number, y: number) => x + y
  const result = curry(fn)(1, 2)
  expect(result).toEqual(3)
})
