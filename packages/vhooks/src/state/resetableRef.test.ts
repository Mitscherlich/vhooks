import { isRef } from 'vue-demi'

import { useResetableRef } from './resetableRef'

test('useResetableRef should return a Ref and a reset function', () => {
  const [ref, reset] = useResetableRef(1)
  expect(isRef(ref)).toBe(true)
  expect(typeof reset).toBe('function')
})

test('reset function should reset the ref', () => {
  const [ref, reset] = useResetableRef(1)
  ref.value = 2
  expect(ref.value).toBe(2)
  reset()
  expect(ref.value).toBe(1)
  reset(2)
  expect(ref.value).toBe(2)
})

test('useResetableRef would take object as initial value', () => {
  const initial = { a: 1 }
  const [ref, reset] = useResetableRef(initial)
  // Take care: this means you would mutate initial value
  // don't do this in production
  // ref.value.a = 2
  // console.log(initial) --> { a: 2 }
  ref.value = { a: 2 }
  expect(ref.value).toEqual({ a: 2 })
  reset()
  expect(ref.value).toEqual({ a: 1 })
})
