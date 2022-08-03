// Section of the filter panel

<template>
  <div class="filter-section">
    <Collapse
      :title="title"
    >
      <div>
        <div v-if="type === 'checkbox'" v-for="filter in filters" class="section-list">
          <label :for="filter" class="container">
            {{getFormat(filter)}}
            <input  @change="change" type="checkbox" :id="filter" :name="filter" checked class="input-checkbox">
            <span class="checkmark"></span>
          </label>
        </div>
        <div v-if="type === 'checkbox'" class="action-btn">
          <a  v-show="!isAllCheckboxesUnchecked" href="#" @click="deselectAll">Décochez tout</a>
          <a v-show="isAllCheckboxesUnchecked" href="#" @click="selectAll">Cochez tout</a>
        </div>
        <div v-else v-for="(filter, index) in filters" key="index" class="section-list">
          <label :for="filter" class="container">
            {{getFormat(filter)}}
            <input @change="change" type="radio" :id="filter" name="radio" :checked="index === 0">
            <span class="checkmark radio"></span>
          </label>
        </div>
      </div>
    </Collapse>
  </div>
</template>

<script  setup lang="ts">
import Collapse from "../Utility/Collapse.vue";
import {ref} from "vue";

const props = defineProps<{
  title : string
  filters : string[]
  type : string
}>()

const emit = defineEmits(['change'])

function change(e : Event) {
  emit('change', e.target as HTMLInputElement)
  isAllCheckboxesUnchecked.value = checkIfAllCheckboxesIsUncheked();
}

// format the list
function getFormat(name : string) : string{
  const n1 = name.replaceAll('_', ' ')
  let n2
  if (n1.startsWith('wc')) {
    n2 = n1.slice(0,2).toUpperCase() + n1.slice(2)
  }
  else {
    n2 = n1.charAt(0).toUpperCase() + n1.slice(1)
  }
  return n2
}

const isAllCheckboxesUnchecked = ref(false)

// function that verify if all checkbox are checked
function checkIfAllCheckboxesIsUncheked()  {
  const checkboxes = document.getElementsByClassName('input-checkbox')
  for (const c of Array.from(checkboxes)) {
     if ((c as HTMLInputElement).checked) {
       return false
     }
  }
  return true
}

// checked all the checkbox
function selectAll() {
  const checkboxes = document.getElementsByClassName('input-checkbox')
  for (const c of Array.from(checkboxes)) {
    (c as HTMLInputElement).checked = true
    emit('change', c)
  }
  isAllCheckboxesUnchecked.value = false
}

// deselect all the checkbox
function deselectAll() {
  const checkboxes = document.getElementsByClassName('input-checkbox')
  for (const c of Array.from(checkboxes)) {
    (c as HTMLInputElement).checked = false
    emit('change', c)
  }
  isAllCheckboxesUnchecked.value = true
}

</script>

<style scoped>
.filter-section {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--primary-color);
}

.action-btn {
  margin: 1rem 0;
}

.action-btn a {
  color: var(--primary-color);
  text-decoration: none;
}

.action-btn a:hover {
  text-decoration: underline;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.container {
  display: block;
  position: relative;
  padding-left: 2rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  font-size: 1em;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 1em;
  width: 1em;
  background-color: #eee;
}

.container:hover input ~ .checkmark {
  background-color: var(--border-color);
}

.container input:checked ~ .checkmark {
  background-color: var(--primary-color);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  left: 0.3em;
  top: 0.1em;
  width: 0.3em;
  height: 0.6em;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.radio {
  position: absolute;
  top: 0;
  left: 0;
  height: 1.1em;
  width: 1.1em;
  background-color: #eee;
  border-radius: 50%;
}

.container:hover input ~ .radio {
  background-color: #ccc;
}

.container input:checked ~ .radio {
  background-color: var(--primary-color);
}

.container .radio:after {
  top: 0.35em;
  left: 0.35em;
  width: 0.3em;
  height: 0.3em;
  border-radius: 50%;
  background: white;
}

</style>
