<template>
  <Header @btnClick="changeMenuState"/>
  <list-room @selected="setCurrentRoom"></list-room>
  <FloorChange @floor-updated="changeCurrentFloor"/>
  <FilterMenu v-show="menuState">

  </FilterMenu>
  <Map
      :center="center"
      :zoom="zoom"
      :floor-features="floorFeatures"
      :selected-room="currentRoom"
  ></Map>
</template>

<script setup lang="ts">
import Map from "./components/Map.vue";
import Header from "./components/Header.vue";
import FloorChange from "./components/FloorChange.vue";
import ListRoom from "./components/listRoom.vue";

import {onMounted, ref} from "vue";
import {fetchBaseFeatures, fetchOtherFeatures, FloorFeature, floorsFeatures} from "./mapElement/Feature";
import FilterMenu from "./components/FilterMenu.vue";

const center = [741387.81, 5906075.56]
const zoom = 18
const currentRoom = ref<string | undefined>(undefined)

function setCurrentRoom(selectedRoom : string) {
  currentRoom.value = selectedRoom
}

const floorFeatures = ref<FloorFeature | undefined>()

function getFeatures(floor : string) {
  const features = floorsFeatures.get(floor)
  if (features != undefined) {
    floorFeatures.value = new FloorFeature(features.lines, features.polygons, features.labels)
  }
}

onMounted(async () => {
  await fetchBaseFeatures()
  getFeatures('E')
  await fetchOtherFeatures()
})

function changeCurrentFloor (newFloor : string) {
  getFeatures(newFloor)
}

const menuState = ref(false)

function changeMenuState (newState : boolean) {
  menuState.value = newState

}

</script>

<style>

*{
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
