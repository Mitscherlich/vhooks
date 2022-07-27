import dayjs from 'dayjs'
import { isNumber } from '@m9ch/vhooks-utils'
import useEffect from '../useEffect'
import useMemo from '../useMemo'
import useState from '../useState'
import useLatest from '../useLatest'

export type TDate = dayjs.ConfigType

export interface Options {
  leftTime?: number
  targetDate?: TDate
  interval?: number
  onEnd?: () => void
}

export interface FormattedRes {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

const calcLeft = (target?: TDate) => {
  if (!target)
    return 0

  // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
  const left = dayjs(target).valueOf() - Date.now()
  return left < 0 ? 0 : left
}

const parseMs = (milliseconds: number): FormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  }
}

export default function useCountDown(options: Options = {}) {
  const { leftTime, targetDate, interval = 1000, onEnd } = options || {}

  const target = useMemo<TDate>(() => {
    if ('leftTime' in options)
      return isNumber(leftTime) && leftTime > 0 ? Date.now() + leftTime : undefined
    else
      return targetDate
  }, [leftTime, targetDate])

  const [timeLeft, setTimeLeft] = useState(calcLeft(target.value))

  const onEndRef = useLatest(onEnd)

  useEffect(() => {
    if (!target.value) {
      // for stop
      setTimeLeft(0)
      return
    }

    // 立即执行一次
    setTimeLeft(calcLeft(target.value))

    const timer = setInterval(() => {
      const targetLeft = calcLeft(target.value)
      setTimeLeft(targetLeft)
      if (targetLeft === 0) {
        clearInterval(timer)
        onEndRef.value?.()
      }
    }, interval)

    return () => clearInterval(timer)
  }, [targetDate, interval])

  const formattedRes = useMemo(() => parseMs(timeLeft.value), [timeLeft])

  return [timeLeft, formattedRes] as const
}
