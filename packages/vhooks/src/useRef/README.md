# useRef

## Usage

### Basic example

```jsx
import { useRef } from '@m9ch/vhooks'
import { defineComponent } from 'vue'

const App = defineComponent(() => {
  const ref = useRef(null)

  return () => (
    <div ref={ref}>...</div>
  )
})
```

## API

```ts
useRef<T>(initialValue?: T | Ref<T>): Ref<T>
```
