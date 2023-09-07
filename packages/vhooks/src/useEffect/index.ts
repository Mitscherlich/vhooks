import type {
  DependencyList,
  EffectCallback,
} from '@m9ch/vhooks-types'
import {
  isArray,
  isMap,
  isObject,
  isPlainObject,
  isSet,
} from 'lodash'
import {
  effect,
  getCurrentInstance,
  isReactive,
  isRef,
  onUpdated,
  queuePostFlushCb,
} from 'vue-demi'
import type { Cleanup, Effect } from './types'

const queuePostRenderEffect = queuePostFlushCb

export default function useEffect(fn: EffectCallback, deps?: DependencyList) {
  const invokeCleanup: Cleanup = () => {
    const { current } = invokeCleanup
    if (current) {
      current()
      invokeCleanup.current = null
    }
  }
  const invokeEffect: Effect = () => {
    const { current } = invokeEffect
    if (current) {
      invokeCleanup.current = current()
      invokeEffect.current = fn
    }
  }
  invokeEffect.current = fn

  const job = () => {
    invokeCleanup()
    invokeEffect()
  }
  const visitor = (dep: any) => {
    if (Array.isArray(dep))
      return dep.map(visitor)
    if (isReactive(dep))
      return traverse(dep)
    if (isRef(dep))
      return dep.value
    return dep
  }
  effect(() => visitor(deps), {
    scheduler: job,
    onStop: invokeCleanup,
  })
  mountEffect()
  updateEffect()

  function mountEffect() {
    queuePostRenderEffect(job)
  }
  function updateEffect() {
    if (!deps && getCurrentInstance()) {
      // make sure there is a vm instance
      onUpdated(() => {
        queuePostFlushCb(job)
      })
    }
  }
}

export enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  IS_SHALLOW = '__v_isShallow',
  RAW = '__v_raw',
}

export function traverse(value: unknown, seen?: Set<unknown>) {
  if (!isObject(value) || (value as any)[ReactiveFlags.SKIP])
    return value

  seen = seen || new Set()
  if (seen.has(value))
    return value

  seen.add(value)
  if (isRef(value)) {
    traverse(value.value, seen)
  }
  else if (isArray(value)) {
    for (let i = 0; i < value.length; i++)
      traverse(value[i], seen)
  }
  else if (isSet(value) || isMap(value)) {
    value.forEach((v: any) => {
      traverse(v, seen)
    })
  }
  else if (isPlainObject(value)) {
    for (const key in value)
      traverse((value as any)[key], seen)
  }
  return value
}
