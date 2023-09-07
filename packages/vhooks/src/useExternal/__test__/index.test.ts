import { act, fireEvent, renderHook } from '@m9ch/vhooks-test-utils'
import type { Options } from '../index'
import useExternal from '../index'

const setup = (path: string, options?: Options) => renderHook(() => useExternal(path, options))

describe('useExternal', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    document.head.innerHTML = ''
  })

  it('should load a script', async () => {
    const path = 'https://ahooks.js.org/useExternal/test-external-script.js'
    const { result } = setup(path, {
      js: {
        async: true,
      },
    })
    const script = document.querySelector('script') as HTMLScriptElement
    expect(result.current.value).toBe('loading')
    await act(() => {
      fireEvent.load(script)
    })
    expect(result.current.value).toBe('ready')
  })

  it('should load a css', async () => {
    const path = 'https://ahooks.js.org/useExternal/bootstrap-badge.css'
    const { result } = setup(path, {
      css: {
        media: 'all',
      },
    })
    const link = document.querySelector('link') as HTMLLinkElement
    expect(result.current.value).toBe('loading')
    await act(() => {
      fireEvent.load(link)
    })
    expect(result.current.value).toBe('ready')
  })

  it('status should be unset without path', () => {
    const { result } = setup('')
    expect(result.current.value).toBe('unset')
  })

  it('status should be error when load failed', async () => {
    const { result } = setup('xx.js')
    const script = document.querySelector('script') as HTMLScriptElement
    await act(() => {
      fireEvent.error(script)
    })
    expect(result.current.value).toBe('error')
  })

  it('should throw error when provide unsupported type', () => {
    const mockSpy = vi.spyOn(console, 'error').mockImplementationOnce(() => {})
    setup('ahooks.ts')
    expect(mockSpy).toBeCalled()
  })

  it('should not load again when the js exists', async () => {
    const path = 'a.js'
    const hook1 = setup(path)
    const script = document.querySelector('script') as HTMLScriptElement
    await act(() => {
      fireEvent.load(script)
    })
    expect(hook1.result.current.value).toBe('ready')

    const hook2 = setup(path)
    expect(hook2.result.current.value).toBe('ready')
  })

  it('should not load again when the css exists', async () => {
    const path = 'a.css'
    const hook1 = setup(path)
    const link = document.querySelector('link') as HTMLLinkElement
    await act(() => {
      fireEvent.load(link)
    })
    expect(hook1.result.current.value).toBe('ready')

    const hook2 = setup(path)
    expect(hook2.result.current.value).toBe('ready')
  })

  it('should remove when not use', async () => {
    const { unmount } = setup('b.js')
    const script = document.querySelector('script') as HTMLScriptElement
    await act(() => {
      fireEvent.load(script)
    })
    unmount()
    expect(document.querySelector('script')).toBeNull()
  })

  it('css preload should work in IE Edge', async () => {
    Object.defineProperty(HTMLLinkElement.prototype, 'hideFocus', {
      value: true,
    })
    setup('b.css')
    const link = document.querySelector('link') as HTMLLinkElement
    await act(() => {
      fireEvent.load(link)
    })
    expect(link.rel).toBe('preload')
    expect(link.as).toBe('style')
  })
})
