import type { Dispatch, Action as SetStateAction } from '@m9ch/vhooks-types'
import { onUnmounted } from 'vue-demi'
import useRef from '../useRef'
import useState from '../useState'

function useRafState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]
function useRafState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>]

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
