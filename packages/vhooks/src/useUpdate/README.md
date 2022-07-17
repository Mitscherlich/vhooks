# useUpdate

Returns a function which can be used to force the component re-render.

## Example

### Basic usage

```html
<script setup>
import { useUpdate } from '@m9ch/vhooks'

const update = useUpdate()
</script>

<template>
  <span>now: {{ Date.now() }}<span>
  <button @click="update">update</button>
</template>
```
