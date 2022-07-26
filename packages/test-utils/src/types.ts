export interface RendererProps<TProps, TResult> {
  callback: (props: TProps) => TResult
  setError: (error: Error) => void
  setValue: (value: TResult) => void
}

export interface Renderer<TProps> {
  render: (props?: TProps) => void
  rerender: (props?: TProps) => void
  unmount: () => void
  act: Act
}

export type CreateRenderer<
  TProps,
  TResult,
  TRenderer extends Renderer<TProps> = Renderer<TProps>,
> = (props: RendererProps<TProps, TResult>) => TRenderer

export interface RenderResult<TValue> {
  readonly all: Array<TValue | Error>
  readonly current: TValue
  readonly error?: Error
}

export interface RenderHookOptions<TProps> {
  initialProps?: TProps
}

export interface Act {
  (callback: () => Promise<void | undefined>): Promise<undefined>
  (callback: () => void | undefined): void
}
