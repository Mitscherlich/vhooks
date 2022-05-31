import type { MaybeRef } from '@m9ch/vhooks-types'
import { EventEmitter } from '@m9ch/vhooks-utils'
import type { Ref } from 'vue'
import { unref } from 'vue-demi'
import { useEffect, useRef } from '../core'

const eventMap = new Map<string, EventEmitter>()

let uid = 0

export const useEventBus = (namespace?: MaybeRef<string>) => {
  if (namespace == null && process.env.NODE_ENV === 'development') {
    console.warn(`[@m9ch/vhooks] useEventBus() expects a namespace string but got an undefined.
    we'll use an auto-generated namespace instead.`)
    namespace = `__event_bus_${uid++}__`
  }

  const events: Ref<EventEmitter> = useRef(eventMap.get(unref(namespace)))

  useEffect(() => {
    events.value ??= new EventEmitter(unref(namespace))

    return () => {
      events.value.clear()
      eventMap.delete(unref(namespace))
    }
  }, [])

  return events
}
