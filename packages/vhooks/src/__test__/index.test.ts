import * as vhooks from '..'

describe('vhooks', () => {
  test('exports modules should be defined', () => {
    Object.keys(vhooks).forEach((module) => {
      expect(vhooks[module]).toBeDefined()
    })
  })
})
