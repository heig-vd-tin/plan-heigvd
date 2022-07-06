<template>
  <CollapseHeader title="Ressources : " @change="change" id="collapse-header"/>
  <div
    v-if="resources !== undefined"
    v-show="visibility" v-for="resource in resources"
    class="resource-item"
  >
    <p>{{resource.name}}</p>
    <p>{{resource.type}}</p>
  </div>
</template>

<script setup lang="ts">

import CollapseHeader from "../Utility/CollapseHeader.vue";
import {ref} from "vue";

const props = defineProps<{
  resources : {name : string, type : string }[] | undefined
}>()

const visibility = ref(false)

function change(e : boolean) {
  visibility.value = e
}

</script>

<style scoped>
.resource-item {
  margin-bottom: 10px;
}


</style>
