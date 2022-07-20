import type { MaybeRef } from '@m9ch/vhooks-types'
import { unref } from 'vue-demi'
import useCallback from '../useCallback'
import useEffect from '../useEffect'
import useLatest from '../useLatest'
import useRef from '../useRef'

interface Handle {
  id: number | NodeJS.Timer
}

function useRafInterval(
  fn: () => void,
  delay: MaybeRef<number | undefined>,
  options?: {
    immediate?: boolean
  },
) {
  const immediate = options?.immediate

  const fnRef = useLatest(fn)
  const timerRef = useRef<Handle>()

  useEffect(() => {
    const _delay = unref(delay)
    if (typeof _delay !== 'number' || _delay < 0)
      return
    if (immediate)
      fnRef.value()

    timerRef.value = setRafInterval(() => {
      fnRef.value()
    }, _delay)

    return () => {
      if (timerRef.value)
        clearRafInterval(timerRef.value)
    }
  }, [delay])

  const clear = useCallback(() => {
    if (timerRef.value)
      clearRafInterval(timerRef.value)
  }, [])

  return clear
}

function setRafInterval(callback: () => void, delay = 0): Handle {
  if (typeof requestAnimationFrame === typeof undefined) {
    return {
      id: setInterval(callback, delay),
    }
  }
  let start = new Date().getTime()
  const handle: Handle = {
    id: 0,
  }
  const loop = () => {
    const current = new Date().getTime()
    if (current - start >= delay) {
      callback()
      start = new Date().getTime()
    }
    handle.id = requestAnimationFrame(loop)
  }
  handle.id = requestAnimationFrame(loop)
  return handle
}

function cancelAnimationFrameIsNotDefined(t: any): t is NodeJS.Timer {
  return typeof cancelAnimationFrame === typeof undefined
}

function clearRafInterval(handle: Handle) {
  if (cancelAnimationFrameIsNotDefined(handle.id))
    return clearInterval(handle.id)

  cancelAnimationFrame(handle.id)
}

export default useRafInterval
