import { remove, toArray } from './array'

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
