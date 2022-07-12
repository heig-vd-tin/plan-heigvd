<template>
  <Collapse
    title="Ressources : "
  >
    <div v-if="resources !== undefined">
      <div
          v-for="resource in resources"
          class="resource-item"
      >
        <p>{{resource.name}}</p>
        <p>{{resource.type}}</p>
      </div>
    </div>
  </Collapse>
</template>

<script setup lang="ts">

import Collapse from "../Utility/Collapse.vue";

const props = defineProps<{
  resources : {name : string, type : string }[] | undefined
}>()

</script>

<style scoped>
.resource-item {
  margin-bottom: 10px;
}

</style>
