// component that contain the list of persons

<template>
  <Collapse title="Personnel :">
    <div
        v-if="people !== undefined && people.length !== 0"
        id="list"
    >
      <p  v-for="person in people" class="person-item">{{person}}</p>
    </div>
  </Collapse>
</template>

<script setup lang="ts">

import Collapse from "../Utility/Collapse.vue";

const props = defineProps<{
  people : string[] | undefined
}>()

</script>

<style scoped>
.person-item {
  margin-bottom: 5px;
}

</style>
