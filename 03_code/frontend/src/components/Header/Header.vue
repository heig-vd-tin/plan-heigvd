<template>
  <header class="header">
    <div class="left-header">
      <div v-show="!inResearchMode" class="left-header-normal">
      <div class="left-header-btn">
        <Button  v-show="!menuBtnState" @click="changeBtnState" id="bar-btn">
          <font-awesome-icon size="lg" :icon="['fas', 'bars']"/>
        </Button>
        <Button  v-show="menuBtnState" @click="changeBtnState" id="cross-btn">
          <font-awesome-icon size="lg" :icon="['fas', 'xmark']"/>
        </Button>
      </div>
      <img src="../../assets/HEIG-VD_logotype_rouge-rvb.svg" class="logo" alt="logo HEIG-VD">
      <h1 class="title-text">Plans</h1>
    </div>
    <Research @suggestion-selected="changeResearchMode" v-show="inResearchMode" id="left-research-bar"/>
    </div>
    <div class="right-header">
      <Research class="research-bar" id="right-research-bar"/>
      <div class="right-header-btn">
        <Button v-show="!inResearchMode" @click="changeResearchMode" id="research-btn">
          <font-awesome-icon size="lg" :icon="['fas', 'magnifying-glass']"/>
        </Button>
        <Button v-show="inResearchMode" @click="changeResearchMode" id="research-btn">
          <font-awesome-icon size="lg" :icon="['fas', 'xmark']"/>
        </Button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

import {ref} from "vue";
import Research from "./Research.vue";
import Button from "../Utility/Button.vue";

const emit = defineEmits(['btnClick'])

// menu button
const menuBtnState = ref(false)

function changeBtnState () {
  menuBtnState.value = !menuBtnState.value
  emit('btnClick', menuBtnState.value)
}

const inResearchMode = ref(false)

function changeResearchMode() {
  inResearchMode.value = !inResearchMode.value
}

// Correct a bug when the user click the search button in portrait mode and go in landscape mode after
window.onresize = () => {
  if (window.innerWidth > 440 && inResearchMode.value === true) {
    inResearchMode.value = !inResearchMode.value
  }
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
    height: 3em;

    background-color: var(--primary-background-color);
    border-bottom: 1px solid var(--border-color);
  }

  .left-header {
    width: clamp(240px, 50%, 300px);
  }

  .left-header-normal {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
  }

  .left-header-btn {
    height: calc(3em - 1px);
    width: 20%;
    border-right: 1px solid var(--border-color);
  }

  .title-text {
    margin: 0 0 0 0;
    font-weight: normal;
    font-size: 2em;
    width: 50%;
  }


  .logo {
    width: clamp(60px, 15%, 70px);
    display: block;
    height: 2em;
    margin-left: 0.8rem
  }

  .right-header {
    display: flex;
    justify-content: end;
    width: clamp(20px, 50%, 300px);
  }

  #research-btn {
    display: none;
  }

  #left-research-bar {
    display: none;
  }

  @media only screen and (max-width: 440px) {

    #left-research-bar {
      display: block;
    }

    .left-header {
      width: 80%;
    }

    .right-header {
      width: 20%;
    }

    .right-header-btn {
      width: 100%;
    }


    #right-research-bar {
      display: none;
    }

    #research-btn {
      display: block;
      border-left: 1px solid var(--border-color);
    }
  }
</style>
