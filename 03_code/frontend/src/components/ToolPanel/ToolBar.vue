<template>
  <div
      class="toolbar"
      :style="isFilterPanelVisible ? {'left' : 'clamp(300px, 20%, 600px)'} : {'left' : '0px'}"
      @mouseenter="onHover"
      @mouseleave="leaveHover"
  >
    <Tool tool-name="Site" class="item" id="building-change">
      <BuildingChange
          @building-changed="$emit('buildingChanged')"
        :onHover="isHovered"
      />
    </Tool>
    <Tool tool-name="Etage" :is-last="true" class="item" id="floor-change">
      <floor-change/>
    </Tool>
  </div>
</template>

<script setup lang="ts">
import FloorChange from "./FloorChange.vue";
import BuildingChange from "./BuildingChange.vue";
import Tool from "./Tool.vue";
import {ref} from "vue";

const props = defineProps<{
  isFilterPanelVisible : boolean
}>()

const emit = defineEmits(['buildingChanged'])

const isHovered = ref(false)

function onHover() {
  isHovered.value = true
}

function leaveHover() {
  isHovered.value = false
}

</script>

<style scoped>

.toolbar {
  position: fixed;
  top: 3em;
  z-index: 1;
  transition: left 0.3s ease-out;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: clamp(100px, calc(100% - 3em), 320px);
  width: auto;

  background-color: var(--secondary-background-color);
  border: 0 1px 1px solid var(--border-color);
}

#building-change {
  height: clamp(80px, 33%, 100px);
}

#floor-change {
  height: clamp(100px, 67%, 220px);
}


@media only screen and (max-height: 280px) {
  .toolbar {
    height: calc(100% - 3em);
    flex-wrap: wrap;
  }

  #building-change {
    height: 49%;
    margin-right: 0.5rem;
    margin-bottom: 0;
  }

  #floor-change {
    height: 100%;
  }
}
</style>
