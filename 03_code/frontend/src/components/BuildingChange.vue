<template>
  <div class="building-change" v-for="building in buildings.list">
    <ToolButton
        :selected="building === buildings.selected"
        @click="changeSelected"
    >
      {{building}}
    </ToolButton>
  </div>
</template>

<script setup lang="ts">
import ToolButton from "./ToolButton.vue";
import {currentBuildingStore} from "../stores/currentBuilding";

const buildings = currentBuildingStore()

function changeSelected(e : Event) {
  buildings.change((e.target as HTMLElement).innerText)
}

</script>

<style scoped>

</style>
