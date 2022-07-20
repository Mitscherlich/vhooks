# usePrevious

A Hook to return the previous state.

## Examples

### Basic usage

```html
<script setup>
import { usePrevious, useState } from '@m9ch/vhooks'

const [count, setCount] = useState(0)
const previous = usePrevious(count)
</script>

<template>
  <div>counter current value: {{ count }}</div>
  <div style="margin-bottom: 8px;">counter previous value: {{ previous }}</div>
  <button type="button" @click="setCount((c) => c + 1)">
    increase
  </button>
  <button type="button" style="margin-bottom: 8px;" @click="setCount((c) => c - 1)">
    decrease
  </button>
</template>
```

### Custom shouldUpdate function

Previous value update only when the `shouldUpdate` function return `true`.

```html
<script setup>
import { usePrevious, useState } from '@m9ch/vhooks'

const nameCompareFunction = (prev, next) => {
  if (!prev)
    return true
  if (prev.name !== next.name)
    return true
  return false
}

const jobCompareFunction = (prev, next) => {
  if (!prev)
    return true
  if (prev.job !== next.job)
    return true
  return false
}

const [state, setState] = useState({ name: 'Jack', job: 'student' })
const [nameInput, setNameInput] = useState('')
const [jobInput, setJobInput] = useState('')
const previousName = usePrevious(state, nameCompareFunction)
const previousJob = usePrevious(state, jobCompareFunction)
</script>

<template>
  <div style="margin: 8px 0; border: 1px solid #e8e8e8; padding: 8px;">
    <div>current name: {{ state.name }}</div>
    <div>current job: {{ state.job }}</div>
  </div>
  <div>previous name: {{ previousName?.name }}</div>
  <div style="margin-bottom: 8px;">previous job: {{ previousJob?.job }}</div>
  <div style="margin-top: 8px;">
    <input
      style="width: 220px"
      :value="nameInput"
      placeholder="new name"
      @change="(e) => setNameInput(e.target.value)"
    />
    <button
      type="button"
      @click="() => {
        setState((s) => ({ ...s, name: nameInput }));
      }"
      style="margin-left: 8px;"
    >
      update
    </button>
  </div>
  <div style="margin-top: 8px;">
    <input
      style="width: 220px"
      :value="jobInput"
      @change="(e) => setJobInput(e.target.value)"
      placeholder="new job"
    />
    <button
      type="button"
      @click="() => {
        setState((s) => ({ ...s, job: jobInput }));
      }"
      style="margin-left: 8px;"
    >
      update
    </button>
  </div>
</template>
```

## API

```ts
function usePrevious<T>(
  state: MaybeRef<T>,
  shouldUpdate?: (prev: T | undefined, next: T) => boolean
): DeepReadonly<Ref<T>>
```
