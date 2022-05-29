<template>
  <select class="listRoom" @change="$emit('selected', select($event))">
    <option value="">Choose a room</option>
    <option v-for="room in rooms" :value="room">{{room}}</option>
  </select>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {getRoomsName} from "../api/api";

const rooms = ref<string[]>([])

function select(e : Event) {
  return (e.target as HTMLInputElement).value
}

onMounted(async () => {
  const data : {name : string}[] = await getRoomsName()
  rooms.value = data.map(e  => e.name).filter(e => e != 'WC')
})

</script>

<style scoped>
  .listRoom {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 2;
  }
</style>
