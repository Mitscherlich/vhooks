# useResetableRef

Returns a `Ref` and a `Function` which can reset the `Ref` to its initial value.

## Example

### Basic usage

```html
<script setup>
import { useResetableRef } from '@m9ch/vhooks'

const [count, reset] = useResetableRef(0)
</script>

<template>
  <span>count: {{ count }}<span>
  <button @click="count += 1">increase</button>
  <button @click="count -= 1">decrease</button>
  <button @click="reset()">reset</button>
</template>
```

## API

```ts
function useResetableRef<T>(initialValue: MaybeRef<T>): [Ref<T>, (newVal?: MaybeRef<T>) => void]
```
