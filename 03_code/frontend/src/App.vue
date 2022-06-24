<template>
  <Header @btnClick="changeMenuState"/>
 <!-- <list-room @selected="setCurrentRoom"></list-room>-->
  <FloorChange
      :floors="buildingData.floors"
      :ground-floor="buildingData.groundFloor"
      @floor-updated="changeCurrentFloor"
  />
  <FilterMenu
      v-show="filterMenuVisibility"
      @filter-updated="filtersChange"
      :filter-list="filterList"
  />
  <InfoPanel v-show="infoPanelVisibility"/>
  <Map
      :center="buildingData.center"
      :zoom="buildingData.zoom"
      :rotation="buildingData.rotation"
      :minZoom="buildingData.minZoom"
      :maxZoom="buildingData.maxZoom"

      :floor-features="floorFeatures"
      :background-features="bgFeatures"
      :interests-features="resourceFeatures"
      :selected-room="currentRoom"
      @room-selected="displayRoomInfo"
  ></Map>
</template>

<script setup lang="ts">
import Map from "./components/Map.vue";
import Header from "./components/Header.vue";
import FloorChange from "./components/FloorChange.vue";
import ListRoom from "./components/listRoom.vue";
import FilterMenu from "./components/FilterMenu.vue";
import InfoPanel from "./components/InfoPanel.vue";

import {onMounted, ref} from "vue";
import {
  backgroundFeatures, getDisplayedResource,
  fetchBaseFeatures,
  fetchOtherFeatures,
  FloorFeature,
  floorsFeatures, getAllRessourceType,
} from "./mapElement/Feature";

import {Feature} from "ol";
import {buildingsInfo} from "./data/data";

// All the building data
let buildingData = buildingsInfo.get('Cheseaux')

let floor = ''
let filters : string[] = []
const filterList = ref<string[]>([])


/*
//room
const currentRoom = ref<string | undefined>(undefined)

function setCurrentRoom(selectedRoom : string) {
  currentRoom.value = selectedRoom
}
*/

const bgFeatures = ref<Feature[] | undefined>()
const floorFeatures = ref<FloorFeature | undefined>()
const resourceFeatures = ref<Feature[] | undefined>()

function getFeatures(newFloor : string) {
  floor = newFloor
  const features = floorsFeatures.get(floor)
  if (features != undefined) {
    floorFeatures.value = new FloorFeature(features.lines, features.polygons, features.labels, features.resources)
  }
}

function changeCurrentFloor (newFloor : string) {
  getFeatures(newFloor)
  resourceFeatures.value = getDisplayedResource(filters, newFloor)
}

function filtersChange (newFilters : string[]) {
  filters = newFilters
  resourceFeatures.value = getDisplayedResource(newFilters, floor)
}

// info panel
const infoPanelVisibility = ref(false)

function displayRoomInfo (info : string) {
  infoPanelVisibility.value = true
  console.log(info)
}

function undisplayRoomInfo (info : string) {
  infoPanelVisibility.value = false
  console.log(info)
}

// filter panel
const filterMenuVisibility = ref(false)

function changeMenuState (newState : boolean) {
  filterMenuVisibility.value = newState
}

onMounted(async () => {
  if (buildingData != undefined) {
    await fetchBaseFeatures(buildingData.groundFloor)
    bgFeatures.value = backgroundFeatures
    filterList.value = getAllRessourceType()
    filters = filterList.value
    resourceFeatures.value = getDisplayedResource(filterList.value, buildingData.groundFloor)
    floor = buildingData.groundFloor
    getFeatures('E')
    await fetchOtherFeatures(buildingData.floors, buildingData.groundFloor)
  }
})
</script>

<style>

*{
  box-sizing: border-box;
}

html, body {
  margin: 0;
}
html {
  height: 100%;
}

body {
  height: calc(100% - 50px);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
