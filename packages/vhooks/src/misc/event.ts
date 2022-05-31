import { EventEmitter } from '@m9ch/vhooks-utils'
import { useEffect } from '../core'

const events = new EventEmitter()

export interface EventType<T extends string = string, D = any> {
  type: T
  payload?: D
}

export const useEvent = <EE extends EventType>(event: EE['type'], fn?: (payload?: EE['payload']) => any, bus: EventEmitter = events) => {
  return useEffect(() => {
    const listener = (payload: EE['payload']) => {
      fn && fn(payload)
    }

    bus.on(event, listener)

    return () => {
      bus.off(event, listener)
    }
  }, [])
}
