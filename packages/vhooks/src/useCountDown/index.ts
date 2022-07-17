import dayjs from 'dayjs'
import useEffect from '../useEffect'
import useMemo from '../useMemo'
import useState from '../useState'
import useLatest from '../useLatest'

export type TDate = Date | number | string | undefined

export interface Options {
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

const calcLeft = (t?: TDate) => {
  if (!t)
    return 0

  // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
  const left = dayjs(t).valueOf() - new Date().getTime()
  if (left < 0)
    return 0

  return left
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
  const { targetDate, interval = 1000, onEnd } = options || {}

  const [timeLeft, setTimeLeft] = useState<number>(calcLeft(targetDate))

  const onEndRef = useLatest(onEnd)

  useEffect(() => {
    if (!targetDate) {
      // for stop
      setTimeLeft(0)
      return
    }

    // 立即执行一次
    setTimeLeft(calcLeft(targetDate))

    const timer = setInterval(() => {
      const targetLeft = calcLeft(targetDate)
      setTimeLeft(targetLeft)
      if (targetLeft === 0) {
        clearInterval(timer)
        onEndRef.value?.()
      }
    }, interval)

    return () => clearInterval(timer)
  }, [targetDate, interval])

  const formattedRes = useMemo(() => {
    return parseMs(timeLeft.value)
  }, [timeLeft])

  return [timeLeft, formattedRes] as const
}
