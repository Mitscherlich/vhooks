import { copy, isObject, shallowEqual } from './index'

test('isObject should return true for object', () => {
  expect(isObject({})).toBe(true)
})

test('isObject should return false for null and undefined', () => {
  expect(isObject(null)).toBe(false)
  expect(isObject(undefined)).toBe(false)
})

test('shallowEqual should return true for same primitive and object', () => {
  expect(shallowEqual('string', 'string')).toBe(true)
  expect(shallowEqual(1, 1)).toBe(true)
  expect(shallowEqual(true, true)).toBe(true)
  expect(shallowEqual({ a: 1 }, { a: 1 })).toBe(true)
})

test('shallowEqual should return false for different primitive and object', () => {
  expect(shallowEqual('string', 1)).toBe(false)
  expect(shallowEqual(1, 'string')).toBe(false)
  expect(shallowEqual(true, false)).toBe(false)
  expect(shallowEqual({ a: 1 }, { a: 2 })).toBe(false)
})

test('copy should return same primitive and object', () => {
  expect(copy('string')).toBe('string')
  expect(copy(1)).toBe(1)
  expect(copy(true)).toBe(true)
  expect(copy({ a: 1 })).toEqual({ a: 1 })
})

test('copy should return different object in same shape', () => {
  const obj = { a: 1 }
  expect(copy(obj)).not.toBe(obj)
  expect(copy(obj)).toEqual(obj)
})
