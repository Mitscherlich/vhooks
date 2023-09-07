import type { MaybeRef } from '@m9ch/vhooks-types'
import { isNumber } from 'lodash'
import { unref } from 'vue-demi'
import useEffect from '../useEffect'
import useLatest from '../useLatest'
import useRef from '../useRef'

interface Handle {
  id: number | NodeJS.Timeout
}

function useRafTimeout(fn: () => void, delay?: MaybeRef<number>) {
  const fnRef = useLatest(fn)
  const timerRef = useRef<Handle>()

  useEffect(() => {
    const _delay = unref(delay)

    if (!isNumber(_delay) || _delay < 0)
      return

    timerRef.value = setRafTimeout(() => {
      fnRef.value()
    }, _delay)

    return () => {
      if (timerRef.value)
        clearRafTimeout(timerRef.value)
    }
  }, [delay])

  const clear = () => {
    if (timerRef.value)
      clearRafTimeout(timerRef.value)
  }

  return clear
}

function setRafTimeout(callback: () => void, delay = 0): Handle {
  if (typeof requestAnimationFrame === typeof undefined) {
    return {
      id: setTimeout(callback, delay),
    }
  }

  const handle: Handle = {
    id: 0,
  }

  const startTime = new Date().getTime()

  const loop = () => {
    const current = new Date().getTime()
    if (current - startTime >= delay)
      callback()

    else
      handle.id = requestAnimationFrame(loop)
  }
  handle.id = requestAnimationFrame(loop)
  return handle
}

function cancelAnimationFrameIsNotDefined(t: any): t is NodeJS.Timer {
  return typeof cancelAnimationFrame === typeof undefined
}

function clearRafTimeout(handle: Handle) {
  if (cancelAnimationFrameIsNotDefined(handle.id))
    return clearTimeout(handle.id)

  cancelAnimationFrame(handle.id)
}

export default useRafTimeout
