<template>
    <div v-if="selected" class="block selected">
      <slot></slot>
    </div>
    <a v-else href="#" @click="click" class="block btn">
      <slot></slot>
    </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  selected?: boolean
}>()

const emit = defineEmits(['click'])

function click(e : Event) {
  emit('click', e)
}

</script>

<style scoped>
.block {
  padding: 10px 5px;
  height: 35px;
  width: 100%;
  text-align: center;
  white-space: pre;
  font-size: 12px;
}

.btn {
  background-color: var(--primary-background-color);
  display: block;
  text-decoration: none;
  color: var(--font-color);
}

.btn:hover {
  background-color: var(--border-color);
}

.btn:visited {
  color: var(--font-color);
}

.selected {
  background-color: var(--primary-color);
  color: white;
}


</style>
