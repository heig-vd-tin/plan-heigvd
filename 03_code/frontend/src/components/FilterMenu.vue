<template>
  <div class="filter-menu">
    <h2>Filters</h2>
    <div v-for="filter in filters">
      <input @change="change" type="checkbox" :id="filter" :name="filter" checked>
      <label :for="filter">{{filter}}</label>
    </div>
  </div>
</template>

<script setup lang="ts">

import {onMounted, onUpdated, ref} from "vue";

const props = defineProps<{
  filterList : string[]
}>()

const emit = defineEmits(['filterUpdated'])

const filters = ref<string[]>([])
let filtersChecked : string[] = []
let firstUpdate = true

function change(e : Event) {
  const element = e.target as HTMLInputElement
  if (element.checked) {
    filtersChecked.push(element.name)
  } else {
    filtersChecked = filtersChecked.filter(name => name != element.name)
  }
  emit('filterUpdated', filtersChecked)
}

onUpdated(() => {
  if (firstUpdate) {
    filters.value = props.filterList
    filtersChecked = props.filterList
    firstUpdate = false
  }
})

</script>

<style scoped>
  .filter-menu {
    position: fixed;
    left: 0;
    z-index: 1;
    top: 50px;
    background-color: white;
    width: 25%;
    height: calc(100vh - 50px);
    border-right: 1px solid lightgrey;
    padding-left: 20px;
  }
</style>
