<template>
  <div class="info-panel">

    <div class="info-header">
      <ToolButton @click="$emit('close')">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </ToolButton>
    </div>
    <div v-for="(room, index) in selectedRoom" class="info-item" key="index">
      <h3>{{room.name}}</h3>
      <p v-if="room.type != null">Type : <span>{{room.type}}</span></p>
      <p v-if="room.surface != null">Surface : <span>{{room.surface}}</span> m2</p>
      <p v-if="room.capacity != null">Capacité : <span>{{room.capacity}}</span> places</p>
      <div v-if="people[index] !== undefined && people[index].length !== 0">
        <p >Personnel : </p>
        <p  v-for="person in people[index]">- {{person}}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import ToolButton from "./ToolButton.vue";

const props = defineProps<{
  selectedRoom : {name : string, type : string | null, surface : string | null, capacity : string | null}[]
}>()

const people = ref<string[][]>([])


watch(() => props.selectedRoom, async (newRooms) => {
  people.value = []
  for (const room of newRooms) {
    const resp = await fetch(`https://contacts.heig-vd.ch/search/${room.name}.json`).then(res => res.json())
    const obj = resp.people
    const p : string[] = []
    for (const letter in obj) {
      for (const person of obj[letter]){
        p.push(`${person.first_name} ${person.last_name}`)
      }
    }
    people.value.push(p)
  }
})

const emit = defineEmits(['close'])

</script>

<style scoped>
  .info-panel {
    position: fixed;
    z-index: 1;
    right: 0;
    height: 100%;
    width: 300px;

    background-color: var(--primary-background-color);
    border-left: 1px solid var(--border-color);
    overflow: auto;
  }

  .info-header {
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 20px;
  }

  .info-item {
    border-bottom: 1px solid var(--border-color);
    margin: 20px;
    padding-bottom: 20px;
  }
</style>
