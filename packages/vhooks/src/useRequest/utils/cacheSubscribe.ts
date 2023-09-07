type Listener = (data: any) => void
const listeners: Record<string, Listener[]> = {}

export function trigger(key: string, data: any) {
  if (listeners[key])
    listeners[key].forEach(item => item(data))
}

export function subscribe(key: string, listener: Listener) {
  if (!listeners[key])
    listeners[key] = []

  listeners[key].push(listener)

  return function unsubscribe() {
    const index = listeners[key].indexOf(listener)
    listeners[key].splice(index, 1)
  }
}
