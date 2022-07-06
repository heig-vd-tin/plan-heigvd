<template>
  <div class="toolbar">
    <Tool tool-name="Site" class="item">
      <BuildingChange/>
    </Tool>
    <Tool tool-name="Etages" :is-last="true" class="item">
      <floor-change/>
    </Tool>
  </div>
</template>

<script setup lang="ts">
import FloorChange from "./FloorChange.vue";
import BuildingChange from "./BuildingChange.vue";
import Tool from "./Tool.vue";
</script>

<style scoped>
.toolbar {
  position: fixed;
  left: 20px;
  top: 70px;
  z-index: 1;

  background-color: var(--secondary-background-color);
  border-right: 1px solid var(--border-color);
}

.item {
  width: 70px;
}

@media only screen and (max-height: 400px) {
  .toolbar {
    display: flex;
  }
}
</style>
