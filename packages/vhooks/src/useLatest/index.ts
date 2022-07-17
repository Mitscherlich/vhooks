import type { MaybeRef } from '@m9ch/vhooks-types'
import type { Ref } from 'vue-demi'
import { unref } from 'vue-demi'
import useRef from '../useRef'

export default function useLatest<T>(value: MaybeRef<T>): Ref<T> {
  const ref = useRef(value)
  ref.value = unref(value)
  return ref
}
