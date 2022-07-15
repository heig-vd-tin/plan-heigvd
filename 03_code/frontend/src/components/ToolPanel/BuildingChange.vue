<template>
  <div class="building-change">
    <Button
        v-for="b in buildings.list"
        class="btn"
        :selected="b === buildings.selected"
        @click="changeSelected"
    >
      {{ formatName(b) }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from "../Utility/Button.vue";
import {currentBuildingStore} from "../../stores/currentBuilding";
import {currentFloorStore} from "../../stores/currentFloor";

const props = defineProps<{
  onHover : boolean
}>()

function formatName(building : string) {
  if (props.onHover) {
    return building
  } else {
    if (building.indexOf('-') === -1 ){
      return building.slice(0,2).toUpperCase()
    }
    else {
      const splits = building.split('-')
      let res = ''
      splits.forEach(v => res += v.charAt(0))
      return res.toUpperCase()
    }
  }
}

const buildings = currentBuildingStore()

function changeSelected(e : Event) {
  buildings.change((e.target as HTMLElement).innerText)
  if (buildings.info !== undefined) {
    const floors = buildings.info.floors !== null ?
        buildings.info.floors.map(f => f.name) :
        []

    currentFloorStore().initStore(
        buildings.selected,
        floors,
        buildings.info.groundFloor
    )
  }
}

</script>

<style scoped>
.building-change {
  height: 100%;
}

.btn {
  height: 50%;
}


</style>
