import { customRef } from 'vue-demi'

export const useRef = <T>(value: T) => customRef<T>((track, trigger) => ({
  get: () => {
    track()
    return value
  },
  set: (newVal) => {
    value = newVal
    trigger()
  },
}))
