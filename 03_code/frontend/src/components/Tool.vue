<template>
  <div class="tool">
    <p class="tool-name">{{ toolName }}</p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const prop = defineProps<{
  toolName : string
}>()
</script>

<style scoped>
  .tool {
    padding: 10px 3px;
    margin-bottom: 10px;
  }

  .tool-name {
    text-align: center;
    font-size: 12px;
    margin-bottom: 5px;
  }
</style>
