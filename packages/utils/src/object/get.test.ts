import { get } from './get'

describe('get', () => {
  it('get(obj, \'a.b\') should return obj.a.b', () => {
    const obj = { a: { b: 1 } }
    expect(get(obj, 'a.b')).toBe(1)
  })

  it('get(obj, \'a[0]\') should return obj.a[0]', () => {
    const obj = { a: [1] }
    expect(get(obj, 'a[0]')).toBe(1)
  })

  it('get(obj, \'a[0].b\') should return obj.a[0].b', () => {
    const obj = { a: [{ b: 1 }] }
    expect(get(obj, 'a[0].b')).toBe(1)
  })
})
