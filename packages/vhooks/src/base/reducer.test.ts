import { useReducer } from './reducer'

const reducer = (state: number, action: string) => {
  switch (action) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    default:
      return state
  }
}

test('useReducer should return a Ref and a dispatch function', () => {
  const [ref, dispatch] = useReducer<number, string>(reducer, 1)
  expect(typeof ref).toBe('object')
  expect(typeof dispatch).toBe('function')
})

test('dispatch should set the ref', () => {
  const [ref, dispatch] = useReducer<number, string>(reducer, 1)
  dispatch('increment')
  expect(ref.value).toBe(2)
})
