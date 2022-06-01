import { EventEmitter } from '@m9ch/vhooks-utils'
import { useEffect } from '../core'

const events = new EventEmitter()

export interface EventType<T extends string = string, D = any> {
  type: T
  payload?: D
}

export type Dispatch<D = any> = (payload?: D) => void

export function useEvent(event: string): Dispatch
export function useEvent<E extends string, EE extends EventType = EventType<E>>(event: EE['type']): Dispatch<EE['payload']>
export function useEvent<E extends string, D = any, EE extends EventType = EventType<E, D>>(event: EE['type'], fn?: (payload?: D) => any): Dispatch<EE['payload']>
export function useEvent<E extends string, D = any, EE extends EventType = EventType<E, D>>(event: EE['type'], fn?: (payload?: D) => any, bus?: EventEmitter): Dispatch<EE['payload']>
export function useEvent<E extends string, D = any, EE extends EventType = EventType<E, D>>(event: EE['type'], fn?: (payload?: EE['payload']) => any, bus: EventEmitter = events) {
  useEffect(() => {
    const listener = (payload?: EE['payload']) => {
      fn && fn(payload)
    }

    bus.on(event, listener)

    return () => {
      bus.off(event, listener)
    }
  }, [])

  const dispatch = (payload?: EE['payload']) => {
    bus.emit(event, payload)
  }

  return dispatch
}
