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

import ToolButton from "../Utility/Button.vue";
import {currentFloorStore} from "../../stores/currentFloor";

const currentFloor = currentFloorStore()

function floorUp() {
  currentFloor.up()
}

function floorDown() {
  currentFloor.down()
}

</script>

<style scoped>
  .floor-change {
    z-index: 1;
    display: flex;
    flex-direction: column;
    background-color: rgb(240,240,240);
  }

  .arrow-up {
    border-bottom: 1px solid lightgrey;
  }

  .arrow-down {
    border-top: 1px solid lightgrey;
  }

</style>
