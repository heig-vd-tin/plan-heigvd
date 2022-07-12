<template>
  <div class="research-bar">
    <input
        type="text"
        placeholder="Search"
        class="research-input"
        @input ="researchResource"
        id="research-input"
    >
    <div v-show="suggestionBoxVisibility" class="suggestion-box">
      <SuggestionSection
          title="Salles"
          :list="suggestionsFiltered.rooms"
          @item-selected="roomSelected"
      />
      <SuggestionSection
          title="Personnel"
          :list="suggestionsFiltered.people"
          @item-selected="personSelected"
      />
      <div
          v-show="suggestionsFiltered.people.length === 0 && suggestionsFiltered.rooms.length === 0"
          class="suggestion-error"
      >
        <p>Aucune salle ou personnes<br/> n'a ce nom</p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {getPeople, getPersonLocation, getRoomByName, getRoomSuggestions} from "../../api/api";
import {RoomSuggestion, Suggestion} from "../../interface/interface";
import {currentBuildingStore} from "../../stores/currentBuilding";
import {currentFloorStore} from "../../stores/currentFloor";
import {roomSelectedStore} from "../../stores/roomSelected";
import SuggestionSection from "./suggestionSection.vue";

const suggestionBoxVisibility = ref(false)

let roomSuggestions : RoomSuggestion[] = []
let peopleSuggestions : {id : string, name :string}[]

let suggestions : Suggestion = {rooms : [], people : []}
const suggestionsFiltered = ref<Suggestion>({rooms : [], people : []})


const roomList : RoomSuggestion[] = []
let isCached = false

async function researchResource(e : Event) {
  const input = (e.target as HTMLInputElement).value
  if (input.length >= 2) {
    if (!isCached) {
      // fetch all suggestions
      const rs =  await getRoomSuggestions(input)
      if (rs !== null) {
        roomSuggestions = rs
        suggestions.rooms = roomSuggestions.map(v => v.room_name)
        suggestionsFiltered.value.rooms = suggestions.rooms
      }
      isCached = true
    }
    else {
      suggestionsFiltered.value.rooms = suggestions.rooms.filter(v => v.toLowerCase().includes(input.toLowerCase()))
    }
    suggestionBoxVisibility.value = true
    peopleSuggestions = await getPeople(input)
    suggestions.people = peopleSuggestions.filter(v => {
      return v.name.toLowerCase().includes(input.toLowerCase())
    }).map(v => v.name)
    suggestionsFiltered.value.people = suggestions.people
  }
  else {
    reinitializeSuggestion()
  }
}

function reinitializeSuggestion() {
  suggestions.rooms = []
  suggestionsFiltered.value.rooms = []
  isCached = false
  suggestionBoxVisibility.value = false
}

function roomSelected(room : string) {
  const roomSelected = roomSuggestions.filter(v => v.room_name === room)[0]
  selected(roomSelected)
}

async function personSelected(person : string) {
  const personSelected = peopleSuggestions.filter(v => v.name === person)[0]
  const roomName = await getPersonLocation(personSelected.id)
  const room = await getRoomByName(roomName)
  if (room.length !== null) {
    selected(room[0])
  }
}

function selected(room : RoomSuggestion) {
  const building = currentBuildingStore()
  const floor = currentFloorStore()
  const roomSelected = roomSelectedStore()

  building.change(room.building_name)
  if (building.info !== undefined) {
    floor.initStore(
        building.selected,
        building.info.floors.map(f => f.name),
        room.floor_name
    )
  }

  roomSelected.selected = room

  reinitializeSuggestion()
  const input = document.getElementById('research-input')
  if (input !== null) {
    (input as HTMLInputElement).value = ''
  }
}

</script>

<style scoped>
  .research-bar {
    width: 300px;
    padding: 11px;
  }

  .research-input {
    width: 100%;
    padding: 0.4rem 0.5rem;
    border-radius: 3px;
    background-color: var(--primary-background-color);
    border: 2px solid var(--border-color);
    outline: none;
  }

  .research-input:focus {
    border: 2px solid var(--primary-color);
  }

  .suggestion-box {
    border: 1px solid var(--border-color);
    background-color: var(--primary-background-color);
    max-height: 500px;
    overflow: auto;
  }

  .suggestion-error {
    padding: 0.6rem 0.6rem;
    color: var(--primary-color);
  }
</style>
