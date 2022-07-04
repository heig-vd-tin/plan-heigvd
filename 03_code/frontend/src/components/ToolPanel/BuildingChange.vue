<template>
  <div class="building-change" v-for="b in buildings.list">
    <ToolButton
        :selected="b === buildings.selected"
        @click="changeSelected"
    >
      {{ b }}
    </ToolButton>
  </div>
</template>

<script setup lang="ts">
import ToolButton from "../Utility/Button.vue";
import {currentBuildingStore} from "../../stores/currentBuilding";
import {currentFloorStore} from "../../stores/currentFloor";

const buildings = currentBuildingStore()

function changeSelected(e : Event) {
  buildings.change((e.target as HTMLElement).innerText)
  if (buildings.info !== undefined) {
    currentFloorStore().initStore(
        buildings.selected,
        buildings.info.floors,
        buildings.info.groundFloor
    )
  }


}

</script>

<style scoped>

</style>
