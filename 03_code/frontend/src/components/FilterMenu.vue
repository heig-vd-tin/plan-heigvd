<template>
  <div class="filter-menu">
    <div class="filter-section">
      <h2 class="section-title">Ressources</h2>
      <div v-for="filter in filters.list">
        <label :for="filter" class="container">
          {{filter}}
          <input @change="change" type="checkbox" :id="filter" :name="filter" checked >
          <span class="checkmark"></span>
        </label>
      </div>
    </div>
    <div class="filter-section">
      <h2 class="section-title">Affichage</h2>
    </div>
  </div>
</template>

<script setup lang="ts">

import {filtersStore} from "../stores/Filters";

const filters = filtersStore()

function change(e : Event) {
  const element = e.target as HTMLInputElement
  if (element.checked) {
    filters.push(element.name)
  } else {
    filters.remove(element.name)
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
  }

  .filter-section {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border-color);
  }

  .section-title {
    margin: 10px 0;
  }

  .container {
    display: block;
    position: relative;
    padding-left: 25px;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 16px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    width: 16px;
    background-color: #eee;
  }

  .container:hover input ~ .checkmark {
    background-color: var(--border-color);
  }

  .container input:checked ~ .checkmark {
    background-color: var(--primary-color);
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .container input:checked ~ .checkmark:after {
    display: block;
  }

  .container .checkmark:after {
    left: 5px;
    top: 1px;
    width: 4px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
</style>
