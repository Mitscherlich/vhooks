import { getCurrentInstance } from 'vue-demi'
import { noop } from '@m9ch/utils'

export default function useUpdate() {
  const instance = getCurrentInstance()
  return instance ? () => instance.proxy.$forceUpdate() : noop
}
