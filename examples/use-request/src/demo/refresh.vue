<script setup lang="ts">
import Mock from 'mockjs'

import {
  useEffect, useRequest,
} from '@m9ch/vhooks'

function getUsername(id: number): Promise<string> {
  // eslint-disable-next-line no-console
  console.log('use-request-refresh-id', id)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'))
    }, 1000)
  })
}

const { data, loading, run, refresh } = useRequest((id: number) => getUsername(id), {
  manual: true,
})

useEffect(() => {
  run(1)
}, [])
</script>

<template>
  <div v-if="loading">
    loading...
  </div>
  <div v-else>
    <p>Username: {{ data }}</p>
    <button type="button" @click="refresh">
      Refresh
    </button>
  </div>
</template>
