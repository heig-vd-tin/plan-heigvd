// Zoom change tool component

<template>
  <div class="zoom-change">
    <Button @click="zoomUp" class="first zoom-button" id="zoomUp" >
      <font-awesome-icon :icon="['fas', 'plus']" />
    </Button>
    <Button @click="zoomDown" class="zoom-button" id="zoomDown">
      <font-awesome-icon :icon="['fas', 'minus']" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from "../Utility/Button.vue";

const emit = defineEmits(['zoomUp', 'zoomDown'])

// emit when the button are clicked

function zoomUp() {
  emit('zoomUp')
}

function zoomDown() {
  emit('zoomDown')
}

</script>

<style scoped>
.zoom-change {
  height: 100%;
}

.zoom-button {
  height: 50%;
}

.first {
  border-bottom: 1px solid var(--border-color);
}
</style>
