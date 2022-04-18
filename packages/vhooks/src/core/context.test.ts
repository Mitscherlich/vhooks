import { createContext } from './context'

test('createContext should contains Provider and Consumer components', () => {
  const context = createContext({})
  expect(context.Provider).toBeDefined()
  expect(context.Consumer).toBeDefined()
})
