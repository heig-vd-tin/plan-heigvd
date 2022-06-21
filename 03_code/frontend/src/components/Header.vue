<template>
  <header class="header">
    <div class="left-header">
      <a href="#" @click="changeBtnState" class="menu-btn"><font-awesome-icon size="lg" :icon="['fas', 'bars']"/></a>
      <div class="separator"></div>
      <img src="../assets/HEIG-VD_logotype_rouge-rvb.svg" class="logo" alt="logo HEIG-VD">
      <h1 class="title-text">Plans</h1>
    </div>
  </header>
</template>

<script setup lang="ts">

const emit = defineEmits(['btnClick'])

// menu button
let menuBtnState = false

function changeBtnState () {
  menuBtnState = !menuBtnState
  emit('btnClick', menuBtnState)
}

</script>

<style scoped>



  .header {
    position: fixed;
    top: 0;
    z-index: 1;

    display: flex;
    flex-direction: row;
    vertical-align: center;

    width: 100%;
    height: 50px;

    background-color: white;
    //opacity: 0.8;

    border-bottom: 1px solid lightgrey;
  }

  .left-header {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .menu-btn {
    padding: 14px 20px;
    height: 100%;
    vertical-align: center;
  }

  .menu-btn:hover {
    background-color: lightgrey;
  }

  .logo {
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
