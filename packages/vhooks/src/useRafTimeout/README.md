# useRafTimeout

A hook implements with `requestAnimationFrame` for better performance. The API is consistent with `useTimeout`. the advantage is that will not trigger function when the page is not rendering, such as page hiding or minimization.

> `requestAnimationFrame` will automatically downgrade to `setTimeout` in node environment

## Examples

### Basic usage

```html
<script setup>
import { useRadTimeout, useState } from '@m9ch/vhooks'

const [count, setCount] = useState(0)

useRafTimeout(() => {
  setCount(count + 1)
}, 2000)
</script>

<template>
  <div>count: {{ count }}</div>
</template>
```

### Advanced usage

Modify the delay to realize the timer timeout change and pause.

```html
<script setup>
import { useRadTimeout, useState } from '@m9ch/vhooks'

const [count, setCount] = useState(0)

useRafTimeout(() => {
  setCount(count + 1)
}, 2000)
</script>

<template>
  <div>
    <p> count: {{ count }} </p>
    <p style="margin-top: 16px;"> Delay: {{ delay }} </p>
    <button @click="setDelay((t) => (!!t ? t + 1000 : 1000))" style="margin-right: 8px;">
      Delay + 1000
    </button>
    <button
      style="margin-right: 8px;"
      @click="setDelay(1000)"
    >
      reset Delay
    </button>
    <button
      @click="clear()"
    >
      clear
    </button>
  </div>
</template>
```
