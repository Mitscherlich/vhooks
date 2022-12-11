<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'

// @ts-ignore
import demos from './demo'

const activeKey = ref<string>('')
const activeDemo = computed(() => activeKey.value && demos[activeKey.value])
</script>

<template>
  <select v-model="activeKey">
    <option disabled value="">
      -- select demo --
    </option>
    <option v-for="demo in Object.keys(demos)" :key="demo">
      {{ demo }}
    </option>
  </select>
  <div v-if="activeDemo" class="demo-block">
    <component :is="defineAsyncComponent(activeDemo)" />
  </div>
  <div v-else>
    select demo
  </div>
</template>

<style scoped>
.demo-block {
  border: 1px dashed #ccc;
  padding: 1rem;
  margin: 1rem 0;
}
</style>
