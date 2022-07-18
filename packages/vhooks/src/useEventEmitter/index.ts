import useRef from '../useRef'
import { EventEmitter } from './EventEmitter'

export default function useEventEmitter<T = void>() {
  const ref = useRef<EventEmitter<T>>()
  if (!ref.value)
    ref.value = new EventEmitter()

  return ref.value
}
