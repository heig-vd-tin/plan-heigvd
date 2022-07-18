<template>
  <div class="research-bar">
    <input
        type="text"
        placeholder="Recherche"
        class="research-input"
        @input ="researchResource"
        @focusin="focusIn"
        @focusout="focusOut"
        id="research-input"
    >
    <div v-show="nbCharacter >= 2 && suggestionBoxVisibility" class="suggestion-box">
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

const emit = defineEmits(['suggestionSelected'])

const suggestionBoxVisibility = ref(false)

let roomSuggestions : RoomSuggestion[] = []
let peopleSuggestions : {id : string, name :string}[]

let suggestions : Suggestion = {rooms : [], people : []}
const suggestionsFiltered = ref<Suggestion>({rooms : [], people : []})

const nbCharacter = ref(0)

const roomList : RoomSuggestion[] = []
let isCached = false

function focusIn() {
  suggestionBoxVisibility.value = true
}

function focusOut() {
  // let the user click on suggestion before focus out
  setTimeout(() => {
    suggestionBoxVisibility.value = false
  }, 300)
}

async function researchResource(e : Event) {
  const input = (e.target as HTMLInputElement).value
  if (input.length >= 2) {
    if (!isCached) {
      // fetch all suggestions
      const rs =  await getRoomSuggestions(input)
      if (rs !== null) {
        roomSuggestions = rs
        suggestions.rooms = roomSuggestions.map(v => {
          console.log(v.room_type)
          if (v.room_type !== null) {
            return `${v.room_name} | ${v.room_type}`
          }
          else {
            return v.room_name
          }
        })
        suggestionsFiltered.value.rooms = suggestions.rooms
      }
      isCached = true
    }
    else {
      suggestionsFiltered.value.rooms = suggestions.rooms.filter(v => v.toLowerCase().includes(input.toLowerCase()))
    }

    peopleSuggestions = await getPeople(input)
    suggestions.people = peopleSuggestions.filter(v => {
      return v.name.toLowerCase().includes(input.toLowerCase())
    }).map(v => v.name)
    suggestionsFiltered.value.people = suggestions.people
  }
  else {
    reinitializeSuggestion()
  }
  nbCharacter.value = input.length
}

function reinitializeSuggestion() {
  suggestions.rooms = []
  suggestionsFiltered.value.rooms = []
  suggestionsFiltered.value.people = []
  isCached = false
}

function roomSelected(room : string) {
  const formattedRoom = room.split(' | ')[0]
  const roomSelected = roomSuggestions.filter(v => v.room_name === formattedRoom)[0]
  selected(roomSelected)
}

async function personSelected(person : string) {
  const personSelected = peopleSuggestions.filter(v => v.name === person)[0]
  const roomName = await getPersonLocation(personSelected.id)
  const room = await getRoomByName(roomName)
  if (room !== null) {
    selected(room[0])
  }
  else {
    alert("Le bâtiment où travaille le collaborateur n'a pas encore été implémenté")
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

  emit('suggestionSelected')

  const input = document.getElementById('research-input')
  if (input !== null) {
    (input as HTMLInputElement).value = ''
    nbCharacter.value = 0
  }
}

</script>

<style scoped>
  .research-bar {
    width: 100%;
    padding: 11px;
  }

  .research-input {
    width: 100%;
    font-size: 1em;
    padding: 0.2rem 0.5rem;
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
