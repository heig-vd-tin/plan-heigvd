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
  <!--
    <div class="zoomPanel">
      <Tool tool-name="Zoom">
        <ZoomChange/>
      </Tool>
    </div>
-->
    <Map
        :background-features="bgFeatures"
        @room-selected="displayRoomInfo"
        @room-unselected="undisplayRoomInfo"
    ></Map>
  <!-- </div> -->
</template>

<script setup lang="ts">
import Map from "./components/Map.vue";
import Header from "./components/Header/Header.vue";
import FilterMenu from "./components/FilterPanel/FilterPanel.vue";
import InfoPanel from "./components/InfoPanel/InfoPanel.vue";

import {onMounted, ref} from "vue";
import {
  backgroundFeatures,
  fetchBaseFeatures,
  fetchOtherFeatures,
} from "./mapElement/Feature";

import {Feature} from "ol";
import ToolBar from "./components/ToolPanel/ToolBar.vue";
import {currentFloorStore} from "./stores/currentFloor";
import {filtersStore} from "./stores/Filters";
import {currentBuildingStore} from "./stores/currentBuilding";
import Tool from "./components/ToolPanel/Tool.vue";
import ZoomChange from "./components/ZoomChange.vue";

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
const roomInfo = ref<{name : string, type : string | null, surface : string | null, capacity : string | null}[]>([])

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
  await fetchBaseFeatures()
  bgFeatures.value = backgroundFeatures
  const currentBuilding = currentBuildingStore()
  if (currentBuilding.info !== undefined) {
    currentFloorStore().initStore(
        currentBuilding.selected,
        currentBuilding.info.floors,
        currentBuilding.info.groundFloor
    )
    filtersStore().initStore()
    loading.value = false
    await fetchOtherFeatures(currentBuilding.info.floors, currentBuilding.info.groundFloor)
  }

  filtersStore().initStore()
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

.zoomPanel {
  position: absolute;
  background-color: var(--secondary-background-color);
  z-index: 2;
  width: 60px;
  right: 0;
  bottom: 0;
}
</style>
