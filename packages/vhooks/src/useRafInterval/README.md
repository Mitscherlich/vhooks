# useRafInterval

A hook implements with `requestAnimationFrame` for better performance. The API is consistent with `useInterval`, the advantage is that the execution of the timer can be stopped when the page is not rendering, such as page hiding or minimization.

Please note that the following two cases are likely to be inapplicable, and `useInterval` is preferred:

- the time interval is less than `16ms`
- want to execute the timer when page is not rendering;

> `requestAnimationFrame` will automatically downgrade to `setInterval` in node environment

## Examples

### Basic usage

Execute once per 1000ms.

```html
<script setup>
import { useRafInterval, useState } from '@m9ch/vhooks'

const [count, setCount] = useState(0)

useRafInterval(() => {
  setCount(count.value + 1)
}, 1000)
</script>

<template>
  <div>count: {{ count }}</div>
</template>
```

### Advanced usage

Modify the delay to realize the timer interval change and pause.

```html
<script setup>
import { useRafInterval, useState } from '@m9ch/vhooks'

const [count, setCount] = useState(0);
const [interval, setInterval] = useState(1000)

const clear = useRafInterval(() => {
  setCount(count.value + 1)
}, interval)
</script>

<template>
  <div>
    <p> count: {{ count }} </p>
    <p style="margin-top: 16px;"> interval: {{ interval }} </p>
    <button
      style="margin-right: 8px;"
      @click="setInterval((t) => (!!t ? t + 1000 : 1000))"
    >
      interval + 1000
    </button>
    <button
      style="margin-right: 8px;"
      @click="setInterval(1000)"
    >
      reset interval
    </button>
    <button @click="clear()">
      clear
    </button>
  </div>
</template>
```

## API

```ts
function useRafInterval(
  fn: () => void,
  delay?: MaybeRef<number | undefined>,
  options?: Options
): () => void
```
