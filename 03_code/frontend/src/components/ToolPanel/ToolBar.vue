<template>
  <div
      class="toolbar"
      :style="isFilterPanelVisible ? {'left' : '250px'} : {'left' : '0px'}"
      @mouseenter="onHover"
      @mouseleave="leaveHover"
  >
    <Tool tool-name="Site" class="item">
      <BuildingChange
        :onHover="isHovered"
      />
    </Tool>
    <Tool tool-name="Etage" :is-last="true" class="item">
      <floor-change/>
    </Tool>
  </div>
</template>

<script setup lang="ts">
import FloorChange from "./FloorChange.vue";
import BuildingChange from "./BuildingChange.vue";
import Tool from "./Tool.vue";
import {ref} from "vue";

const props = defineProps<{
  isFilterPanelVisible : boolean
}>()

const isHovered = ref(false)

function onHover() {
  isHovered.value = true
}

function leaveHover() {
  isHovered.value = false
}

</script>

<style scoped>

.toolbar {
  position: fixed;
  top: 50px;
  z-index: 1;
  transition: left 0.3s ease-out;

  background-color: var(--secondary-background-color);
  border: 1px solid var(--border-color);
}

@media only screen and (max-height: 400px) {
  .toolbar {
    display: flex;
  }
}
</style>
