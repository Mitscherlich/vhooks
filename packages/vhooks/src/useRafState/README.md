# useRafState

Update the state in [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) callback, generally used for performance optimization.

## Examples

### Basic usage

```html
<script setup>
import { useEffectm useRafState } from '@m9ch/vhooks'

const [state, setState] = useRafState({
  width: 0,
  height: 0,
})

useEffect(() => {
  const onResize = () => {
    setState({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }
  onResize()

  window.addEventListener('resize', onResize)

  return () => {
    window.removeEventListener('resize', onResize)
  }
}, [])
</script>
```

## API

See [`useState#API`](../useState/README.md#API)
