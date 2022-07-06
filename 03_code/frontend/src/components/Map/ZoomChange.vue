<template>
  <Button @click="zoomUp" class="first" id="zoomUp">+</Button>
  <Button @click="zoomDown" id="zoomDown">-</Button>
</template>

<script setup lang="ts">
import Button from "../Utility/Button.vue";

const emit = defineEmits(['zoomUp', 'zoomDown'])

function zoomUp() {
  emit('zoomUp')
}

function zoomDown() {
  emit('zoomDown')
}

</script>

<style scoped>
.first {
  border-bottom: 1px solid var(--border-color);
}
</style>
