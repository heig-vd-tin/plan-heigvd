<template>
  <div class="floor-change">
    <ToolButton class="arrow-up" @click="floorUp">
      <font-awesome-icon :icon="['fas', 'angle-up']" />
    </ToolButton>
    <ToolButton @click="floorUp" >{{floorItems[2]}}</ToolButton>
    <ToolButton :selected="true">{{floorItems[1]}}</ToolButton>
    <ToolButton @click="floorDown">{{floorItems[0]}}</ToolButton>
    <ToolButton @click="floorDown" class="arrow-down">
      <font-awesome-icon :icon="['fas', 'angle-down']" />
    </ToolButton>
  </div>
</template>

<script setup lang="ts">

import {ref, watch} from "vue";
import {buildingsInfo} from "../data/data";
import ToolButton from "./ToolButton.vue";
import {currentFloorStore} from "../stores/currentFloor";

const props = defineProps<{
  floors : string[]
  groundFloor : string
}>()

const floors = props.floors
let currentFloor = currentFloorStore()

const floorItems = ref<string[]>(['','',''])

watch(() => currentFloor.floor, () => {
  floorItems.value = getFloorState()
})

function floorUp() {
  currentFloor.up()
}

function floorDown() {
  currentFloor.down()
}

function getFloorState() : string[]{
  return [
    currentFloor.previousFloorName,
    currentFloor.currentFloorName,
    currentFloor.nextFloorName
  ]
}
</script>

<style scoped>
  .floor-change {
    z-index: 1;
    display: flex;
    flex-direction: column;
    background-color: rgb(240,240,240);
  }

  .floor-change-item {
    padding: 10px 0;
    height: 35px;
    width: 100%;
    text-align: center;
    white-space: pre;
    background-color: white;
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

  .small-text {
    width: 100%;
    text-align: center;
    font-size: 12px;

  }

  .arrow-up {
    border-bottom: 1px solid lightgrey;
  }

  .arrow-down {
    border-top: 1px solid lightgrey;
  }

  .step-number{
    font-size: 10px;
  }

</style>
