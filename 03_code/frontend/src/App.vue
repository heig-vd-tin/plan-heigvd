<template>
  <div class="main-container">
    <transition name="loading">
      <div v-show="loadingIsVisible" class="loading">
        <div class="loading-bar">
          <div>
            <img src="./assets/HEIG-VD_logotype_rouge-rvb.svg" class="logo" alt="logo HEIG-VD">
            <h1 class="loading-title">
              Plan
            </h1>
          </div>
          <p class="loading-text" v-show="loading">
            Chargement...
          </p>
          <a v-show="!loading" href="#" @click="enterApp" class="loading-btn">
            Entrer
          </a>
        </div>
      </div>
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
  height: calc(100% - 50px);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--font-color);
  height: 100%;
}

.loading {
  position: absolute;
  background-image: url("https://www.yverdon-energies.ch/wp-content/uploads/2019/05/heig-vd-cheseaux.jpg");
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 30;
  background-color: var(--primary-background-color);
  background-size: cover;
  background-position: right;
}

.loading-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  width: 20%;
  background-color: var(--primary-background-color);
  padding: 70px;
}

.logo {
  display: block;
  width: 100%;
}

.loading-title {
  font-size: 60px;
  margin-top: 10px;
  color: var(--font-color);
}

.loading-text {
  height: 50px;
  font-size: 20px;
}

.loading-btn {
  display: block;
  border-radius: 3px;
  padding: 15px 52px;
  border: 1px solid var(--border-color);
  color: var(--font-color);
  text-decoration: none;
  height: 50px;
}

.loading-btn:hover {
  background-color: var(--border-color);
}

h2 {
  font-size: 20px;
  margin-bottom: 0;
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

.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.3s ease-out;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}

</style>
