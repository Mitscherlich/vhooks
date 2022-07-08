import type { MaybeRef } from '@m9ch/vhooks-types'
import { unref } from 'vue-demi'
import { useEffect, useMemo, useState } from '../core'

const MILLISECONDS_SECOND = 1000
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR
const EVENT_VISIBILITY_CHANGE = 'visibilitychange'

export interface CountdownOptions {
  autoStart?: boolean
  interval?: number
}

export const useCountdown = (timeout?: MaybeRef<number>, options?: CountdownOptions) => {
  const {
    autoStart = true,
    interval = 1_000, // 1s
  } = options

  const [counting, setCounting] = useState(false)
  const [endTime, setEndTime] = useState(0)
  const [totalMilliseconds, setTotalMilliseconds] = useState(0)

  const progress = () => {
    if (!counting.value)
      return

    setTotalMilliseconds((currentTotalMilliseconds) => {
      return currentTotalMilliseconds - interval
    })

    ticking()
  }

  let requestId: number
  let timeoutId: number

  const ticking = () => {
    if (!counting.value)
      return

    const delay = Math.min(totalMilliseconds.value, interval)
    if (delay > 0) {
      if (window.requestAnimationFrame) {
        let start: number
        const step = (timestamp: number) => {
          if (!start)
            start = timestamp

          if (timestamp - start < delay)
            requestId = requestAnimationFrame(step)
          else
            progress()
        }

        requestId = window.requestAnimationFrame(step)
      }
      else {
        timeoutId = window.setTimeout(progress, delay)
      }
    }
    else { end() }
  }

  const start = () => {
    if (counting.value)
      return

    setCounting(true)

    if (document.visibilityState === 'visible')
      ticking()
  }

  const pause = () => {
    if (window.requestAnimationFrame)
      cancelAnimationFrame(requestId)
    else
      clearTimeout(timeoutId)
  }

  const abort = () => {
    if (!counting.value)
      return

    pause()
    setCounting(false)
  }

  const end = () => {
    if (!counting.value)
      return

    pause()
    setCounting(false)
    setTotalMilliseconds(0)
  }

  const update = () => {
    if (counting.value) {
      setTotalMilliseconds(() => {
        return Math.max(0, endTime.value - Date.now())
      })
    }
  }

  const reset = () => {
    const currentTimeout = unref(timeout)
    setTotalMilliseconds(currentTimeout)
    setEndTime(Date.now() + currentTimeout)
    if (autoStart)
      start()
  }

  useEffect(() => {
    reset()
  }, [timeout])

  const days = useMemo(() => Math.floor(totalMilliseconds.value / MILLISECONDS_DAY))
  const hours = useMemo(() => Math.floor((totalMilliseconds.value % MILLISECONDS_DAY) / MILLISECONDS_HOUR))
  const minutes = useMemo(() => Math.floor((totalMilliseconds.value % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE))
  const seconds = useMemo(() => Math.floor((totalMilliseconds.value % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND))
  const milliseconds = useMemo(() => totalMilliseconds.value % MILLISECONDS_SECOND)
  const totalDays = useMemo(() => days.value)
  const totalHours = useMemo(() => Math.floor(totalMilliseconds.value / MILLISECONDS_HOUR))
  const totalMinutes = useMemo(() => Math.floor(totalMilliseconds.value / MILLISECONDS_MINUTE))
  const totalSeconds = useMemo(() => Math.floor(totalMilliseconds.value / MILLISECONDS_SECOND))

  const onVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      update()
      ticking()
    }

    if (document.visibilityState === 'hidden')
      pause()
  }

  useEffect(() => {
    document.addEventListener(EVENT_VISIBILITY_CHANGE, onVisibilityChange)

    return () => {
      document.removeEventListener(EVENT_VISIBILITY_CHANGE, onVisibilityChange)
      pause()
    }
  }, [])

  return {
    counting,

    days,
    hours,
    minutes,
    seconds,
    milliseconds,

    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    totalMilliseconds,

    start,
    pause,
    abort,
    reset,
  }
}
