<template>
  <header class="header">
    <div class="left-header">
      <div>
        <a v-show="!menuBtnState" href="#" @click="changeBtnState" class="menu-btn" id="bar-btn"><font-awesome-icon size="lg" :icon="['fas', 'bars']"/></a>
        <a v-show="menuBtnState"  href="#" @click="changeBtnState" class="menu-btn" id="cross-btn"><font-awesome-icon size="lg" :icon="['fas', 'xmark']"/></a>
      </div>
      <div class="separator"></div>
      <img src="../../assets/HEIG-VD_logotype_rouge-rvb.svg" class="logo" alt="logo HEIG-VD">
      <h1 class="title-text">Plans</h1>
    </div>
    <div class="right-header">
      <Research/>
    </div>
  </header>
</template>

<script setup lang="ts">

import {ref} from "vue";
import Research from "./Research.vue";

const emit = defineEmits(['btnClick'])

// menu button
let menuBtnState = ref(false)

function changeBtnState () {
  menuBtnState.value = !menuBtnState.value
  emit('btnClick', menuBtnState.value)
}

</script>

<style scoped>



  .header {
    position: fixed;
    top: 0;
    z-index: 20;

    display: flex;
    flex-direction: row;
    vertical-align: center;
    justify-content: space-between;

    width: 100%;
    height: 50px;

    background-color: var(--primary-background-color);
    border-bottom: 1px solid var(--border-color);
  }

  .left-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
  }

  .menu-btn {
    display: block;
    padding: 14px 20px;
    height: 100%;
    width: 70px;
  }

  .menu-btn:hover {
    background-color: var(--border-color);
    transition: background-color 0.5s ease;
  }

  .logo {
    width: auto;
    display: block;
    height: 100%;
    padding: 10px;
    margin-left: 20px;
  }

  .title-text {
    margin: 0 0 0 0;
    font-weight: normal;
    font-size: 30px;
  }

  .separator {
    border-right: 1px solid lightgrey;
    height: 100%;
    width: 1px;
  }

</style>
