<template>
  <div class="main-container">
    <transition name="loading">
      <Loading
          v-show="loadingIsVisible"
          :is-loading-complete="!loading"
          @app-entered="enterApp"
      />
    </transition>

    <div class="container">
      <Header @btnClick="changeMenuState"/>
      <transition name="toolbar">
        <ToolBar
            :isFilterPanelVisible="filterMenuVisibility"
        />
      </transition>
      <transition name="filter-panel">
        <FilterMenu
            v-show="filterMenuVisibility"
        />
      </transition>
      <transition name="info-panel">
        <InfoPanel
            v-show="infoPanelVisibility"
            :selected-room="roomInfo"
            @close="undisplayRoomInfo"
        />
      </transition>


      <Map
          :loading-finished="!loading"
          :is-info-panel-visible="infoPanelVisibility"
          @room-selected="displayRoomInfo"
          @room-unselected="undisplayRoomInfo"
      ></Map>
    </div>
  </div>
</template>

<script setup lang="ts">
import Map from "./components/Map/Map.vue";
import Header from "./components/Header/Header.vue";
import FilterMenu from "./components/FilterPanel/FilterPanel.vue";
import InfoPanel from "./components/InfoPanel/InfoPanel.vue";

import {onMounted, ref} from "vue";

import ToolBar from "./components/ToolPanel/ToolBar.vue";
import {Info} from "./interface/interface";
import {loadAndDisplayBaseData, loadOtherData} from "./lifecycle/lifecycle";
import Loading from "./components/Loading/Loading.vue";


const loading = ref(true)
const loadingIsVisible = ref(true)

function enterApp() {
  loadingIsVisible.value = false
}

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
  --primary-background-color: #f4ffff;
  --secondary-background-color: #e9eeee;
  --border-color : #c6cccc;
  --font-color:#2c3e50;

}

*{
  box-sizing: border-box;
  margin: 0;
}

html, .main-container, .container {
  height: 100%;
}

body {
  height: calc(100% - 3em);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--font-color);
  height: 100%;
}

.logo {
  display: block;
  width: 100%;
}

h2 {
  font-size: 2em;
}

.ol-control {
  visibility: hidden;
}

.filter-panel-enter-active,
.filter-panel-leave-active {
  transition: all 0.3s ease-out;
}

.filter-panel-enter-from,
.filter-panel-leave-to {
  transform: translateX(-250px);
}

.info-panel-enter-active,
.info-panel-leave-active {
  transition: all 0.3s ease-out;
}

.info-panel-enter-from,
.info-panel-leave-to {
  transform: translateX(300px);
}

@media only screen and (max-width: 440px) {
  .info-panel-enter-active,
  .info-panel-leave-active {
    transition: all 0.3s ease-out;
  }

  .info-panel-enter-from,
  .info-panel-leave-to {
    transform: translateY(300px);
  }
}

.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.3s ease-out;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}

</style>
