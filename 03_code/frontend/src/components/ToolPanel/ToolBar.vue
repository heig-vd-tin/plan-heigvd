<template>
  <div class="toolbar">
    <Tool tool-name="Site">
      <BuildingChange

      />
    </Tool>
    <Tool tool-name="Etages">
      <floor-change/>
    </Tool>
  </div>
</template>

<script setup lang="ts">
import FloorChange from "./FloorChange.vue";
import BuildingChange from "./BuildingChange.vue";
import Tool from "./Tool.vue";
import ZoomChange from "../ZoomChange.vue";
import {currentBuildingStore} from "../../stores/currentBuilding";

const emit = defineEmits(['floorUpdated'])

const currentBuilding = currentBuildingStore()

</script>

<style scoped>
.toolbar {
  position: fixed;
  left: 0;
  top: 50px;
  z-index: 1;

  width: 70px;
  height: calc(100% - 50px);
  background-color: var(--secondary-background-color);
  border-right: 1px solid var(--border-color);
}
</style>
