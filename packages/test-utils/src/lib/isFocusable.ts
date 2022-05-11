export const isFocusable = (el: HTMLElement) => {
  return (
    el.tagName.toUpperCase() === 'INPUT'
    || el.tagName.toUpperCase() === 'TEXTAREA'
    || el.tagName.toUpperCase() === 'SELECT'
    || el.contentEditable === 'true'
    || (el.getAttribute('tabindex') != null && parseInt(el.getAttribute('tabindex')!) >= 0)
  )
}
