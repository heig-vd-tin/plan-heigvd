<template>
  <list-room @selected="setCurrentRoom"></list-room>
  <Map
      :center="center"
      :zoom="zoom"
      :floor-features="floorFeatures"
      :selected-room="currentRoom"
  ></Map>
</template>

<script setup lang="ts">
import Map from "./components/Map.vue";
import ListRoom from "./components/listRoom.vue";
import {onMounted, ref} from "vue";
import {fetchBaseFeatures, FloorFeature, floorsFeatures} from "./mapElement/Feature";

const center = [741387.81, 5906075.56]
const zoom = 18
const currentRoom = ref<string | undefined>(undefined)

function setCurrentRoom(selectedRoom : string) {
  currentRoom.value = selectedRoom
}

const floorFeatures = ref<FloorFeature | undefined>()

onMounted(async () => {
  await fetchBaseFeatures()
  const features = floorsFeatures.get('E')
  if (features != undefined) {
    floorFeatures.value = new FloorFeature(features.lines, features.polygons, features.labels)
  }
})

</script>

<style>

html, body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
