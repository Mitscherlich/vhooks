<script setup lang="ts">
import {
  useRequest, useState,
} from '@m9ch/vhooks'

function editUsername(_username: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5)
        resolve()
      else
        reject(new Error('Failed to modify username'))
    }, 1000)
  })
}

const [state, setState] = useState('')

const { loading, runAsync } = useRequest(editUsername, {
  manual: true,
})

const onClick = async () => {
  try {
    await runAsync(state.value)
    alert(`The username was changed to "${state.value}" !`)
    setState('')
  }
  catch (error) {
    alert(error.message)
  }
}
</script>

<template>
  <div>
    <input
      :value="state"
      placeholder="Please enter username"
      :style="{ width: '240px', marginRight: '16px' }"
      @change="(e: any) => setState(e.target.value)"
    >
    <button :disabled="loading" type="button" @click="onClick">
      {{ loading ? 'Loading' : 'Edit' }}
    </button>
  </div>
</template>
