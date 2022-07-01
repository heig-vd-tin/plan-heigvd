<template>
  <div class="floor-change">
    <ToolButton class="arrow-up" @click="floorUp">
      <font-awesome-icon :icon="['fas', 'angle-up']" />
    </ToolButton>
    <ToolButton @click="floorUp" >{{currentFloor.nextFloorName}}</ToolButton>
    <ToolButton :selected="true">{{currentFloor.currentFloorName}}</ToolButton>
    <ToolButton @click="floorDown">{{currentFloor.previousFloorName}}</ToolButton>
    <ToolButton @click="floorDown" class="arrow-down">
      <font-awesome-icon :icon="['fas', 'angle-down']" />
    </ToolButton>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import ToolButton from "../Utility/Button.vue";
import {currentFloorStore} from "../../stores/currentFloor";

let currentFloor = currentFloorStore()

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
