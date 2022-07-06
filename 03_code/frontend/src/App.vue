<template>
  <!--
  <div class="main-container">
    <div  v-show="loading">Loading</div>
    <div v-show="!loading" class="main-container-2">-->
      <Header @btnClick="changeMenuState"/>
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
          :loading-finished="!loading"
          @room-selected="displayRoomInfo"
          @room-unselected="undisplayRoomInfo"
      ></Map>
 <!--   </div>
  </div>-->
</template>

<script setup lang="ts">
import Map from "./components/Map/Map.vue";
import Header from "./components/Header/Header.vue";
import FilterMenu from "./components/FilterPanel/FilterPanel.vue";
import InfoPanel from "./components/InfoPanel/InfoPanel.vue";

import {onMounted, ref} from "vue";

import {Feature} from "ol";
import ToolBar from "./components/ToolPanel/ToolBar.vue";
import {currentFloorStore} from "./stores/currentFloor";
import {filtersStore} from "./stores/Filters";
import {currentBuildingStore} from "./stores/currentBuilding";
import Tool from "./components/ToolPanel/Tool.vue";
import ZoomChange from "./components/Map/ZoomChange.vue";
import {Info} from "./interface/interface";
import {loadAndDisplayBaseData, loadOtherData} from "./lifecycle/lifecycle";

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
const roomInfo = ref<Info[]>([])

function displayRoomInfo (info : Info[]) {
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
  await loadAndDisplayBaseData()
  loading.value = false
  await loadOtherData()
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

html, .main-container, .main-container-2{
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
