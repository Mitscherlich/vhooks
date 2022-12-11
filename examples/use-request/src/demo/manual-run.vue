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

const { loading, run } = useRequest(editUsername, {
  manual: true,
  onSuccess: (_result, params) => {
    setState('')
    alert(`The username was changed to "${params[0]}" !`)
  },
  onError: (error) => {
    alert(error.message)
  },
})
</script>

<template>
  <div>
    <input
      :value="state"
      placeholder="Please enter username"
      :style="{ width: '240px', marginRight: '16px' }"
      @change="(e: any) => setState(e.target.value)"
    >
    <button :disabled="loading" type="button" @click="run(state)">
      {{ loading.value ? 'Loading' : 'Edit' }}
    </button>
  </div>
</template>
