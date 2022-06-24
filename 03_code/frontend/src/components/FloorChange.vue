<template>
  <div class="floor-change">
    <div class="arrow-up">
      <a href="#" @click="floorUp" class="floor-change-item arrow-btn"><font-awesome-icon :icon="['fas', 'angle-up']" /></a>
    </div>
    <div>
      <a href="#" @click="floorUp" class="floor-change-item arrow-btn">{{floorItems[2]}}</a>
    </div>
    <div class="floor-change-item floor-change-selected-item">{{floorItems[[1]]}}</div>
    <div>
      <a href="#" @click="floorDown" class="floor-change-item arrow-btn">{{floorItems[0]}}</a>
    </div>
    <div class="arrow-down">
      <a href="#" @click="floorDown" class="floor-change-item arrow-btn"><font-awesome-icon :icon="['fas', 'angle-down']" /></a>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {buildingsInfo} from "../data/data";

const props = defineProps<{
  floors : string[]
  groundFloor : string
}>()

const emit = defineEmits(['floorUpdated'])

const buildingData = buildingsInfo.get('Cheseaux')
const floors = props.floors
let currentFloorId = floors.indexOf(props.groundFloor)
const floorItems = ref(
    [floors[currentFloorId - 1],
      floors[currentFloorId],
      floors[currentFloorId + 1]]
)

function floorUp() {
  if (currentFloorId < floors.length - 1) {
    currentFloorId++
    floorChange()
  }
}

function floorDown() {
  if (currentFloorId > 0) {
    currentFloorId--
    floorChange()
  }
}

function floorChange() {
  const selectedFloor = floors[currentFloorId]
  let nextFloor = ' '
  let previousFloor = ' '

  if (currentFloorId < floors.length - 1) {
    nextFloor = floors[currentFloorId + 1]
  }

  if (currentFloorId > 0) {
    previousFloor = floors[currentFloorId - 1]
  }

  floorItems.value = [previousFloor, selectedFloor, nextFloor]

  emit('floorUpdated', floors[currentFloorId])
}

</script>

<style scoped>
  .floor-change {
    position: fixed;
    top: 300px;
    left: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    background-color: white;
  }

  .floor-change-item {
    padding: 10px 0;
    height: 35px;
    width: 40px;
    text-align: center;
    white-space: pre;
  }

  .floor-change-selected-item {
    background-color: #E1251B;
    color: white;
  }

  .arrow-btn {
    background-color: white;
    display: block;
    text-decoration: none;
  }

  .arrow-btn:hover {
    background-color: lightgrey;
  }

  .arrow-btn::selection {

  }

  .arrow-up {
    border-bottom: 1px solid lightgrey;
  }

  .arrow-down {
    border-top: 1px solid lightgrey;
  }

</style>
