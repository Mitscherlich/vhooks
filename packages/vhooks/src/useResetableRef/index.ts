import type { MaybeRef } from '@m9ch/vhooks-types'
import { unref } from 'vue-demi'
import useRef from '../useRef'

export default function useResetableRef<T>(initialValue: MaybeRef<T>) {
  const originValue = unref(initialValue)

  const ref = useRef(initialValue)

  const reset = (newVal: MaybeRef<T> = originValue) => {
    ref.value = unref(newVal)
  }

  return [ref, reset] as const
}
