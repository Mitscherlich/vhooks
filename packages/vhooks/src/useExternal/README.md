# useExternal

Dynamically load JS or CSS, `useExternal` can ensure that the resource is globally unique.

## Examples

### Basic usage

```html
<script setup>
import { useExternal } from '@m9ch/vhooks'

const status = useExternal('/test-external-script.js', {
  js: {
    async: true,
  },
})
</script>

<template>
  <p>
    Status: <b>{{ status }}</b>
  </p>
  <p>
    Response: <i>{{ status === 'ready' ? window.TEST_SCRIPT?.start() : '-' }}</i>
  </p>
</template>
```

### Load CSS

```html
<script setup>
import { useExternal, useState } from '@m9ch/vhooks'

const [path, setPath] = useState('/useExternal/bootstrap-badge.css');

const status = useExternal(path)
</script>

<template>
  <p>
    Status: <b>{{ status }}</b>
  </p>
  <div className="bd-example">
    <span className="badge badge-pill badge-primary">Primary</span>
    <span className="badge badge-pill badge-secondary">Secondary</span>
    <span className="badge badge-pill badge-success">Success</span>
    <span className="badge badge-pill badge-danger">Danger</span>
    <span className="badge badge-pill badge-warning">Warning</span>
    <span className="badge badge-pill badge-info">Info</span>
    <span className="badge badge-pill badge-light">Light</span>
    <span className="badge badge-pill badge-dark">Dark</span>
  </div>
  <br />
  <button type="button" style="margin-right: 8px;" @click="setPath('')">
    unload
  </button>
  <button
    type="button"
    style="margin-right: 8px;"
    @click="setPath('/useExternal/bootstrap-badge.css')"
  >
    load
  </button>
</template>
```
