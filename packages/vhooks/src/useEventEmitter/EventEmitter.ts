import useEffect from '../useEffect'
import useRef from '../useRef'

type Subscription<T> = (val: T) => void

export class EventEmitter<T> {
  private subscriptions = new Set<Subscription<T>>()

  emit = (val: T) => {
    for (const subscription of this.subscriptions)
      subscription(val)
  }

  useSubscription = (callback: Subscription<T>) => {
    const callbackRef = useRef<Subscription<T>>()
    callbackRef.value = callback
    useEffect(() => {
      function subscription(val: T) {
        if (callbackRef.value)
          callbackRef.value(val)
      }
      this.subscriptions.add(subscription)
      return () => {
        this.subscriptions.delete(subscription)
      }
    }, [])
  }
}
