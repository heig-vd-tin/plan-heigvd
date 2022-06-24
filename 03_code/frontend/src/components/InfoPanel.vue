<template>
  <div class="info-panel">

  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const visible = ref(false)
</script>

<style scoped>
  .info-panel {
    position: fixed;
    z-index: 1;
    right: 0;
    height: 100%;
    width: 300px;

    background-color: white;
    border-top: 1px solid lightgrey;
  }
</style>
