<script setup lang="ts">
import Mock from 'mockjs'

import {
  useRequest,
} from '@m9ch/vhooks'

function getUsername(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5)
        resolve(Mock.mock('@name'))
      else
        reject(new Error('Failed to get username'))
    }, 1000)
  })
}

const { data, error, loading } = useRequest(getUsername)
</script>

<template>
  <div v-if="error">
    {{ error.message }}
  </div>
  <div v-else-if="loading">
    loading...
  </div>
  <div v-else>
    Username: {{ data }}
  </div>
</template>
