<template>
  <CollapseHeader
    title="Personnel :"
    @change="change"
    id="collapse-header"
  />
  <div
      v-show="visibility"
      v-if="people !== undefined && people.length !== 0"
      id="list"
  >
    <p  v-for="person in people" class="person-item">{{person}}</p>
  </div>
</template>

<script setup lang="ts">

import CollapseHeader from "../Utility/CollapseHeader.vue";
import {ref} from "vue";

const props = defineProps<{
  people : string[] | undefined
}>()

const visibility = ref(false)

function change(e : boolean) {
  visibility.value = e
}


</script>

<style scoped>
.person-item {
  margin-bottom: 5px;
}


</style>
