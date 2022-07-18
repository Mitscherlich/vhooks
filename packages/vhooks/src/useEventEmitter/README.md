# useEventEmitter

`emit` and `on` is removed in Vue 3, here's a simple solution of using `EventEmitter` without [mitt](https://github.com/developit/mitt) or something else.

## Examples

### Basic usage

```js
const event = useEventEmitter()

event.emit('hello')

// in other context
event.useSubscription((val) => {
  console.log(val)
})
```

> `useSubscription` will automatically register the subscription and unsubscription.

If you want to let the child component notify the parent component, you can just use `props` to pass a `onEvent` function. `useEventEmitter` is most suitable for event management among multiple components or between two components which are far away.

### Parent component shares a event

The parent component creates a `focus$` event emitter, and passes it to its children. When calling `focus$.emit` in MessageBox, InputBox will get notified.

```tsx
import { useEventEmitter, useRef } from '@m9ch/vhooks'

function MessageBox(props: { focus$: EventEmitter<void> }) {
  return () => (
    <div style={{ paddingBottom: '24px' }}>
      <p>You received a message</p>
      <button
        type="button"
        onClick={() => {
          props.focus$.emit()
        }}
      >
        Reply
      </button>
    </div>
  )
}

function InputBox(props: { focus$: EventEmitter<void> }) {
  const inputRef = useRef<any>()
  props.focus$.useSubscription(() => {
    inputRef.value.focus()
  })
  return () => (
    <input ref={inputRef} placeholder="Enter reply" style={{ width: '100%', padding: '4px' }} />
  )
}

export default function () {
  const focus$ = useEventEmitter()
  return (
    <>
      <MessageBox focus$={focus$} />
      <InputBox focus$={focus$} />
    </>
  )
}
```

## API

```ts
type Subscription<T> = (val: T) => void

class EventEmitter<T> {
  emit: (val: T) => void
  useSubscription: (cb: Subscription<T>) => void
}

const result: EventEmitter = useEventEmitter<T>()
```
