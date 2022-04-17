import { useState } from './state'

test('useState should return a Ref and a setter', () => {
  const [state, setState] = useState(1)
  expect(typeof state).toBe('object')
  expect(typeof setState).toBe('function')
})

test('setState should set the ref', () => {
  const [state, set] = useState(1)
  set(2)
  expect(state.value).toBe(2)
})

test('setState would take a function', () => {
  const [state, setState] = useState(1)
  setState(() => 2)
  expect(state.value).toBe(2)
})

test('useState would take object as initial value', () => {
  const [state] = useState({ a: 1 })
  expect(state.value).toEqual({ a: 1 })
})

test('useState take object as initial value and setState should merge with function', () => {
  const [state, setState] = useState({ a: 1, b: 2 })
  setState(prevState => ({ ...prevState, a: 3 }))
  expect(state.value).toEqual({ a: 3, b: 2 })
})
