type EventHandlerFn = (...args: any[]) => void

export interface EventHandler {
  listener?: EventHandlerFn
}

export type EventListener = Record<string, EventHandlerFn[] | EventHandler[]>

export class EventEmitter {
  private eventListeners?: EventListener

  static namespace(namespace: string): EventEmitter {
    return new EventEmitter(namespace)
  }

  constructor(private namespace: string = '') {
    this.eventListeners = {}
  }

  on(event: string, listener?: EventHandlerFn): EventEmitter {
    if (typeof listener !== 'function')
      return this

    event = this.namespace + event

    this.eventListeners[event] = this.eventListeners[event] || []
    // 绑定监听函数
    this.eventListeners[event].push(listener)
    return this
  }

  once(event: string, listener?: EventHandlerFn): EventEmitter {
    if (typeof listener !== 'function')
      return this

    event = this.namespace + event

    // 监听函数只执行一次
    // 对 listener 做一层封装
    const handler = (...args: any[]) => {
      this.off(event, handler)
      listener.apply(this, args)
    }
    handler.listener = listener
    return this.on(event, handler)
  }

  off(event: string, listener?: EventHandlerFn): EventEmitter {
    event = this.namespace + event

    if (!this.eventListeners || !this.eventListeners[event])
      return this

    const listeners = this.eventListeners[event]
    listeners.forEach((handler: EventHandlerFn | EventHandler, index: number) => {
      if (handler === listener || (handler as EventHandler).listener === listener) {
        // 删除监听函数
        listeners.splice(index, 1)
      }
    })
    if (listeners.length === 0)
      delete this.eventListeners[event]

    return this
  }

  offAll(event: string): EventEmitter {
    event = this.namespace + event

    if (!this.eventListeners || !this.eventListeners[event])
      return this

    if (arguments.length === 0) {
      const eventArray = Object.keys(this.eventListeners)
      eventArray.forEach((v) => {
        this.eventListeners[v].length = 0
      })
    }
    else {
      this.eventListeners[event].length = 0
    }
    return this
  }

  emit(event: string, ...args: any[]): EventEmitter {
    event = this.namespace + event

    if (!this.eventListeners || !this.eventListeners[event])
      return this

    let listeners = this.eventListeners[event]
    // 克隆监听函数群，避免循环调用
    listeners = listeners.slice(0)
    listeners.forEach((fn: EventHandlerFn | EventHandler) =>
      typeof fn === 'function' ? fn.apply(this, args) : fn.listener?.apply(this, args),
    )
    return this
  }

  listeners(event: string): EventHandlerFn[] | EventHandler[] {
    return this.eventListeners[this.namespace + event]
  }

  addListener(event: string, listener?: EventHandlerFn): EventEmitter {
    return this.on(this.namespace + event, listener)
  }

  removeListener(event: string, listener?: EventHandlerFn): EventEmitter {
    return this.off(this.namespace + event, listener)
  }

  removeAllListeners(event: string): EventEmitter {
    return this.offAll(this.namespace + event)
  }

  trigger(event: string, ...args: any[]): EventEmitter {
    return this.emit(this.namespace + event, ...args)
  }

  clear() {
    Object.keys(this.eventListeners).forEach((event) => {
      this.removeAllListeners(event)
    })
  }
}
