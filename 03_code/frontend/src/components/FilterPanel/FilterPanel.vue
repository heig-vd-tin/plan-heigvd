<template>
  <div class="filter-menu">
    <FilterMenuSection
        title="Ressources"
        :filters="filters.list"
        type="checkbox"
        @change="resourceChanged"
    />
    <FilterMenuSection
        title="Affichage"
        :filters="['Défaut', 'Par type de salle']"
        type="radio"
        @change="displayChanged"
    />
  </div>
</template>

<script setup lang="ts">

import {filtersStore} from "../../stores/Filters";
import FilterMenuSection from "./FilterPanelSection.vue";
import {displayStore} from "../../stores/display";

const filters = filtersStore()

function resourceChanged(element : HTMLInputElement) {
  if (element.checked) {
    filters.push(element.name)
  } else {
    filters.remove(element.name)
  }
}

const display = displayStore()

function displayChanged(e :HTMLInputElement) {
  const text = (e.target as HTMLInputElement).id
  console.log(text)
  switch (text) {
    case 'Défaut' : {
      display.currentMode = display.mode.default
      break
    }
    case 'Par type de salle' : {
      display.currentMode = display.mode.byType
      break
    }
  }
}

</script>

<style scoped>
  .filter-menu {
    position: fixed;
    left: 0;
    z-index: 1;
    top: 50px;
    background-color: var(--primary-background-color);
    width: 250px;
    height: calc(100vh - 50px);
    border-right: 1px solid var(--border-color);
    padding: 20px;
    overflow: auto;
  }



</style>
