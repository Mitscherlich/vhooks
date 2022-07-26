import type { RenderResult as BaseRenderResult } from '@testing-library/vue'
import { render } from '@testing-library/vue'
import { nextTick as act } from 'vue'
import { createTestHarness } from './helpers/createTestHarness'
import type { CreateRenderer, RenderHookOptions, RenderResult, Renderer, RendererProps } from './types'

function createRenderer<TProps, TResult>(rendererProps: RendererProps<TProps, TResult>) {
  const container = document.createElement('div')
  const testHarness = createTestHarness(rendererProps)

  let instance: BaseRenderResult

  return {
    render: (props?: TProps) => {
      return instance ??= render(testHarness(props), { container })
    },
    rerender: (props?: TProps) => {
      if (!instance)
        throw new Error('Cannot rerender before rendering')

      return instance.rerender(props as any)
    },
    unmount: () => {
      return instance.unmount()
    },
    act,
  } as Renderer<TProps>
}

function makeResultContainer<TValue>() {
  const results: Array<{ value?: TValue; error?: Error }> = []

  const result: RenderResult<TValue> = {
    get all() {
      return results.map(({ value, error }) => error ?? (value as TValue))
    },
    get current() {
      const { value, error } = results[results.length - 1] ?? {}
      if (error)
        throw error

      return value as TValue
    },
    get error() {
      const { error } = results[results.length - 1] ?? {}
      return error
    },
  }

  const updateResult = (value?: TValue, error?: Error) => {
    results.push({ value, error })
  }

  return {
    result,
    setValue: (value: TValue) => updateResult(value),
    setError: (error: Error) => updateResult(undefined, error),
  }
}

function createRenderHook<
  TProps,
  TResult,
  TRendererOptions extends object,
  TRenderer extends Renderer<TProps>,
>(createRenderer: CreateRenderer<TProps, TResult, TRenderer>) {
  const renderHook = (
    callback: (props: TProps) => TResult,
    options = {} as TRendererOptions & RenderHookOptions<TProps>,
  ) => {
    const { result, setValue, setError } = makeResultContainer<TResult>()
    const renderProps = { callback, setValue, setError }
    let hookProps = options.initialProps

    const { render, rerender, unmount } = createRenderer(renderProps)

    render(hookProps)

    const rerenderHook = (newProps = hookProps) => {
      hookProps = newProps
      rerender(hookProps)
    }

    const unmountHook = () => {
      unmount()
    }

    return {
      result,
      rerender: rerenderHook,
      unmount: unmountHook,
    }
  }

  return renderHook
}

const renderHook = createRenderHook(createRenderer)

export { renderHook, act }

export * from './utils'

export * from '@testing-library/dom'

export * from '@testing-library/user-event'
