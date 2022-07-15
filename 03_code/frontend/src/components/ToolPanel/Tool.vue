<template>
  <div class="tool" :class="{last: isLast }">
    <p class="tool-name">{{ toolName }}</p>
    <div class="tool-buttons">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const prop = defineProps<{
  toolName : string,
  isLast? : boolean
}>()
</script>

<style scoped>
  .tool {
    padding: 5px 3px 3px;
    margin-bottom: 10px;
    height: 100%;
    background-color: var(--secondary-background-color);
  }

  .last {
    margin-bottom: 0;
  }

  .tool-name {
    padding: 0 5px 5px;
    text-align: center;
    font-size: 0.8em;
  }

  .tool-buttons {
    height: calc(100% - (10px + 0.8em));
  }
</style>
