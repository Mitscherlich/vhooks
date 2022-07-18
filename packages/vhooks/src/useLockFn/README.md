# useLockFn

Add a lock to an async function to prevent parallel executions.

## Examples

### Basic usage

```html
<script setup>
import { useLockFn, useState } from '@m9ch/vhooks'

function mockApiRequest() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}

const [count, setCount] = useState(0)

const submit = useLockFn(async () => {
  message.info('Start to submit')
  await mockApiRequest()
  setCount((val) => val + 1)
  alert('Submit finished')
})
</script>

<template>
  <p>Submit count: {{ count }}</p>
  <button @click="submit">Submit</button>
</template>
```
