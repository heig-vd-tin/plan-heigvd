<template>
  <!-- <div v-show="!loading"> -->
    <Header @btnClick="changeMenuState"/>
   <!-- <FloorChange
        :floors="buildingData.floors"
        :ground-floor="buildingData.groundFloor"
        @floor-updated="changeCurrentFloor"
    /> -->
    <ToolBar/>
    <FilterMenu
        v-show="filterMenuVisibility"
    />
    <InfoPanel
        v-show="infoPanelVisibility"
        :selected-room="roomInfo"
        @close="undisplayRoomInfo"
    />
    <Map
        :background-features="bgFeatures"

        @room-selected="displayRoomInfo"
        @room-unselected="undisplayRoomInfo"
    ></Map>
  <!-- </div> -->
</template>

<script setup lang="ts">
import Map from "./components/Map.vue";
import Header from "./components/Header.vue";
import FloorChange from "./components/FloorChange.vue";
import ListRoom from "./components/listRoom.vue";
import FilterMenu from "./components/FilterMenu.vue";
import InfoPanel from "./components/InfoPanel.vue";

import {onMounted, ref, watch} from "vue";
import {
  backgroundFeatures, getDisplayedResource,
  fetchBaseFeatures,
  fetchOtherFeatures,
  FloorFeature,
  floorsFeatures, getResourcesList,
} from "./mapElement/Feature";

import {Feature} from "ol";
import {buildingsInfo} from "./data/data";
import ToolBar from "./components/ToolBar.vue";
import {currentFloorStore} from "./stores/currentFloor";
import {filtersStore} from "./stores/Filters";
import {currentBuildingStore} from "./stores/currentBuilding";

/*
//room
const currentRoom = ref<string | undefined>(undefined)

function setCurrentRoom(selectedRoom : string) {
  currentRoom.value = selectedRoom
}
*/


const loading = ref(true)

const bgFeatures = ref<Feature[] | undefined>()

// info panel
const infoPanelVisibility = ref(false)
const roomInfo = ref<{name : string}[]>([])

function displayRoomInfo (info : {name : string, type : string | null, surface : string | null, capacity : string | null}[]) {
  infoPanelVisibility.value = true
  roomInfo.value = info
}

function undisplayRoomInfo () {
  infoPanelVisibility.value = false
  roomInfo.value = []
}

// filter panel
const filterMenuVisibility = ref(false)

function changeMenuState (newState : boolean) {
  filterMenuVisibility.value = newState
}

onMounted(async () => {
  const currentBuilding = currentBuildingStore()
  const buildingData = buildingsInfo.get('Cheseaux')
  if (buildingData != undefined) {
    await fetchBaseFeatures(buildingData.groundFloor)
    currentBuildingStore().change('Cheseaux')
    bgFeatures.value = backgroundFeatures
    loading.value = false
    await fetchOtherFeatures(buildingData.floors, buildingData.groundFloor)
    filtersStore().initStore()
// ;
  }
})
</script>

<style>

:root {
  --primary-color: #E1251B;
  --primary-background-color: #f4f4f4;
  --secondary-background-color: #e9e9e9;
  --border-color : #c6c6c6;
  --font-color:#2c3e50;

}

*{
  box-sizing: border-box;
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
  color: var(--font-color);
  height: 100%;
}

h2 {
  font-size: 20px;
  margin-bottom: 0;
}

.ol-control {
  visibility: hidden;
}
</style>
