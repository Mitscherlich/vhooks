import { customRef, unref } from 'vue-demi'
import type {
  MaybeRef,
  MutableRef,
} from '@m9ch/vhooks-types'

export default function useRef<T>(initValue?: MaybeRef<T>): MutableRef<T> {
  // auto unwrap ref
  let current: T | undefined = initValue ? unref(initValue) : undefined

  let _track: Function
  let _trigger: Function
  const getter = () => {
    _track()
    return initValue ? (current = unref(initValue)) : current
  }
  const setter = (newVal: T) => {
    _trigger()
    current = newVal
  }

  const ref = customRef((track, trigger) => {
    _track = track
    _trigger = trigger
    return { get: getter, set: setter }
  })
  Object.defineProperty(ref, 'current', {
    configurable: false,
    enumerable: true,
    get: getter,
    set: setter,
  })

  return ref as MutableRef<T>
}
