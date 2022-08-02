// component of the button used through the application

<template>
  <div class="btn-container">
    <div v-if="selected" class="block selected">
      <slot></slot>
    </div>
    <a v-else href="#" @click="click" class="block btn ">
      <slot></slot>
    </a>
  </div>
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

.btn-container {
  height: 100%;
  width: 100%;
}

.block {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 0.3rem;
  text-align: center;
  white-space: pre;
  font-size: 0.7em;
}

.btn {
  background-color: var(--primary-background-color);
  text-decoration: none;
  color: var(--font-color);
}

@media (hover: hover) {
  .btn:hover {
    background-color: var(--border-color);
  }
}

.btn:visited {
  color: var(--font-color);
}

.selected {
  background-color: var(--primary-color);
  color: white;
}


</style>
