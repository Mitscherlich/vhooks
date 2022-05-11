import { screen } from '@testing-library/vue'
import { isFocusable } from './isFocusable'

export const setActiveElement = (el: string | HTMLElement) => {
  if (typeof el === 'string')
    [el] = screen.getAllByTestId(el)

  if (!isFocusable(el)) {
    el.contentEditable = 'true'
    el.tabIndex = 1
  }
  el.focus()
}
