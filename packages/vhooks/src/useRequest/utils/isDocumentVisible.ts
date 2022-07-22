import { isBrowser } from '@m9ch/vhooks-utils'

export default function isDocumentVisible(): boolean {
  if (isBrowser)
    return document.visibilityState !== 'hidden'

  return true
}
