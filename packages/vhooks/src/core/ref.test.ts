import { isRef } from 'vue-demi'
import { useRef } from './ref'

test('useRef should return a ref', () => {
  const ref = useRef(1)
  expect(isRef(ref)).toBe(true)
})
