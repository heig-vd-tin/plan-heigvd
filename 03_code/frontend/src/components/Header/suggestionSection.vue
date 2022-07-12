<template>
  <div class="suggestion-section" v-show="list.length !== 0">
    <div class="title-section">{{title}}</div>
    <div v-for="item in list" class="item">
      <Button @click="itemSelected">{{item}}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">

import Button from "../Utility/Button.vue";

const props = defineProps<{
  title : string
  list : string[]
}>()

const emit = defineEmits(['itemSelected'])

function itemSelected(e : Event) {
  const item =  (e.target as HTMLInputElement).innerText
  console.log (item)
  emit('itemSelected', item)
}

</script>

<style scoped>

.suggestion-section {
  padding: 0.4rem   0.4rem;
}

.title-section {
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 2px solid var(--primary-color);
}

.item {
  border-bottom: 1px solid var(--border-color);
}

</style>
