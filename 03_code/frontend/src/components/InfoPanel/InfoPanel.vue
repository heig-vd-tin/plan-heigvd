<template>
  <div class="info-panel">
    <div v-for="(room, index) in selectedRoom" class="info-item" key="index">
      <h3 class="item">{{room.name}}</h3>
      <p v-if="room.type != null" class="item">Type : <span>{{room.type}}</span></p>
      <p v-if="room.surface != null" class="item">Surface : <span>{{room.surface}}</span> m2</p>
      <p v-if="room.capacity != null" class="item">Capacité : <span>{{room.capacity}}</span> places</p>
      <PersonsList
          v-if="people[index] !== undefined && people[index].length !== 0"
          :people="people[index]"
      />
      <ResourceList
        v-if="resources[index] !== undefined && resources[index].length !== 0"
        :resources="resources[index]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {getPeople, getResourceOfRoom} from "../../api/api";
import PersonsList from "./PersonsList.vue";
import ResourceList from "./ResourceList.vue";
import {Info} from "../../interface/interface";

const props = defineProps<{
  selectedRoom : Info[]
}>()

const people = ref<string[][]>([])
const resources = ref<{ name : string, type : string }[][]>([])


watch(() => props.selectedRoom, async (newRooms) => {
  people.value = []
  resources.value = []
  for (const room of newRooms) {
    if (room.flag === 'room') {
      const p = await getPeople(room.name)
      people.value.push(p.map(p => p.name))
      const r = await getResourceOfRoom(room.id)
      if (r !== null) {
        resources.value.push(r)
      }
    }
    else {
      people.value.push([])
      resources.value.push([])
    }
  }
})


</script>

<style scoped>
  .info-panel {
    position: fixed;
    z-index: 10;
    right: 0;
    height: 100%;
    width: 300px;
    padding-bottom: 40px;
    background-color: var(--primary-background-color);
    border-left: 1px solid var(--border-color);
    overflow: auto;
  }

  .info-item {
    border-bottom: 1px solid var(--primary-color);
    margin: 20px;
    padding-bottom: 20px;
  }

  .item {
    margin-bottom: 5px;
  }
</style>
