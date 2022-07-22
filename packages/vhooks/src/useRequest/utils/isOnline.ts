import { isBrowser } from '@m9ch/vhooks-utils'

export default function isOnline(): boolean {
  if (isBrowser && typeof navigator.onLine !== 'undefined')
    return navigator.onLine

  return true
}
