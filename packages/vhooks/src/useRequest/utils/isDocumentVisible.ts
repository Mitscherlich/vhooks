import { isBrowser } from '@m9ch/utils'

export default function isDocumentVisible(): boolean {
  if (isBrowser)
    return document.visibilityState !== 'hidden'

  return true
}
