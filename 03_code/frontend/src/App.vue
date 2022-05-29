<template>
  <list-room @selected="setCurrentRoom"></list-room>
  <Map :center="center" :zoom="zoom" :selected-room="currentRoom"></Map>
</template>

<script setup lang="ts">
import Map from "./components/Map.vue";
import {fromLonLat} from "ol/proj";
import ListRoom from "./components/listRoom.vue";
import {ref} from "vue";

const center = fromLonLat([6.66, 46.779])
const zoom = 18
const currentRoom = ref<string | undefined>(undefined)

function setCurrentRoom(selectedRoom : string) {
  currentRoom.value = selectedRoom
}

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
