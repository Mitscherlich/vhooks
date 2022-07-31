import type { Dispatch, Action as SetStateAction } from '@m9ch/vhooks-types'
import type { DeepReadonly, Ref } from 'vue-demi'
import { onUnmounted } from 'vue-demi'
import useRef from '../useRef'
import useState from '../useState'

function useRafState<S>(initialState: S | (() => S)): [DeepReadonly<Ref<S | undefined>>, Dispatch<SetStateAction<S> | S>]
function useRafState<S = undefined>(): [DeepReadonly<Ref<S | undefined>>, Dispatch<SetStateAction<S | undefined> | S | undefined>]

function useRafState<S>(initialState?: S | (() => S)) {
  const ref = useRef(0)
  const [state, setState] = useState(initialState)

  const setRafState = (value: S | ((prevState: S) => S)) => {
    cancelAnimationFrame(ref.value)

    ref.value = requestAnimationFrame(() => {
      setState(value)
    })
  }

  onUnmounted(() => {
    cancelAnimationFrame(ref.value)
  })

  return [state, setRafState] as const
}

export default useRafState
