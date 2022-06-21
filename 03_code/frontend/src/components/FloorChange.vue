<template>
  <div class="floor-change">
    <div class="arrow-left">
      <a href="#" @click="floorDown" class="floor-change-item arrow-btn"><font-awesome-icon :icon="['fas', 'angle-left']" /></a>
    </div>
    <div>
      <a href="#" @click="floorDown" class="floor-change-item arrow-btn">{{floorItems[0]}}</a>
    </div>
    <div class="floor-change-item floor-change-selected-item">{{floorItems[[1]]}}</div>
    <div>
      <a href="#" @click="floorUp" class="floor-change-item arrow-btn">{{floorItems[2]}}</a>
    </div>
    <div class="arrow-right">
      <a href="#" @click="floorUp" class="floor-change-item arrow-btn"><font-awesome-icon :icon="['fas', 'angle-right']" /></a>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {context} from "msw";
import {floors} from "../data/data";

const f = floors.get('Cheseaux')
let currentFloorId = Math.ceil( f.length / 2 ) - 1 // todo change value
const floorItems = ref(['B  ', 'E', 'G']) // todo Change the default value

const emit = defineEmits(['floorUpdated'])

function floorUp() {
  if (currentFloorId < f?.length - 1) {
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
  const selectedFloor = f[currentFloorId]
  let nextFloor = ' '
  let previousFloor = ' '

  if (currentFloorId < f.length - 1) {
    nextFloor = f[currentFloorId + 1]
  }

  if (currentFloorId > 0) {
    previousFloor = f[currentFloorId - 1]
  }

  floorItems.value = [previousFloor, selectedFloor, nextFloor]


  emit('floorUpdated', f[currentFloorId])
}

</script>

<style scoped>
  .floor-change {
    position: fixed;
    top: 50px;
    right: 0;
    z-index: 1;
    display: flex;
    flex-direction: row;
    background-color: white;
  }

  .floor-change-item {
    padding: 10px 0;
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

  .arrow-left {
    border-right: 1px solid lightgrey;
  }

  .arrow-right {
    border-left: 1px solid lightgrey;
  }

</style>
