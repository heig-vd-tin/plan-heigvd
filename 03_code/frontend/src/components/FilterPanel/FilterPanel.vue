<template>
  <div class="filter-menu">
    <FilterMenuSection
        title="Ressources"
        :filters="filters.list"
        @change="change"
    />
    <FilterMenuSection title="Affichage" :filters="[]"/>
  </div>
</template>

<script setup lang="ts">

import {filtersStore} from "../../stores/Filters";
import ToolButton from "../Utility/Button.vue";
import {ref} from "vue";
import FilterMenuSection from "./FilterPanelSection.vue";

const filters = filtersStore()



function change(e : Event) {
  const element = e.target as HTMLInputElement
  if (element.checked) {
    filters.push(element.name)
  } else {
    filters.remove(element.name)
  }
}

let resourceVisibiltiy = ref(false)

function changeVisibility(){
  resourceVisibiltiy.value = !resourceVisibiltiy.value
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
  }


</style>
