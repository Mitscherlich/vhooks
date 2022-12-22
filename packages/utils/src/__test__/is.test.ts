import { isBoolean, isFunction, isNumber, isObject } from '../index'

describe('is', () => {
  test('isBoolean', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)

    expect(isBoolean('')).toBe(false)
    expect(isBoolean([])).toBe(false)
  })

  test('isFunction', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(() => {})).toBe(true)

    expect(isFunction({})).toBe(false)
    expect(isFunction(1)).toBe(false)
  })

  test('isNumber', () => {
    expect(isNumber(1)).toBe(true)
    expect(isNumber(Infinity)).toBe(true)
    expect(isNumber(NaN)).toBe(true)

    expect(isNumber('str')).toBe(false)
    expect(isNumber({})).toBe(false)
  })

  test('isObject', () => {
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(true)
    // eslint-disable-next-line prefer-regex-literals
    expect(isObject(new RegExp(''))).toBe(true)
    expect(isObject(new Date())).toBe(true)

    expect(isObject(null)).toBe(false)
    expect(isObject(() => {})).toBe(false)
    expect(isObject(123)).toBe(false)
  })
})
