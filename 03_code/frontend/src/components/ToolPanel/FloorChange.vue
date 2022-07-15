<template>
  <div class="floor-change">
    <Button class="arrow-up" @click="floorUp">
      <font-awesome-icon :icon="['fas', 'angle-up']" />
    </Button>
    <Button @click="floorUp" >{{currentFloor.nextFloorName}}</Button>
    <Button :selected="true">{{currentFloor.currentFloorName}}</Button>
    <Button @click="floorDown">{{currentFloor.previousFloorName}}</Button>
    <Button @click="floorDown" class="arrow-down">
      <font-awesome-icon :icon="['fas', 'angle-down']" />
    </Button>
  </div>
</template>

<script setup lang="ts">

import Button from "../Utility/Button.vue";
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
    background-color: var(--secondary-background-color);
    height: 100%;
  }

  Button {
    height: 20%;
  }

  .arrow-up {
    border-bottom: 1px solid lightgrey;
  }

  .arrow-down {
    border-top: 1px solid lightgrey;
  }

</style>
