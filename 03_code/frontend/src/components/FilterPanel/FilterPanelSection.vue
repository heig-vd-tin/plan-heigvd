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
        <div v-if="type === 'checkbox'" class="deselect-btn">
          <a  href="#" @click="deselectAll">Décochez toutes les resources</a>
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

const props = defineProps<{
  title : string
  filters : string[]
  type : string
}>()

const emit = defineEmits(['change'])

function change(e : Event) {
  emit('change', e.target as HTMLInputElement)
}

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

function deselectAll() {
  const checkboxes = document.getElementsByClassName('input-checkbox')
  for (const c of checkboxes) {
    c.checked = false
    emit('change', c)
  }
}
</script>

<style scoped>
.filter-section {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--primary-color);
}

.deselect-btn {
  margin: 20px 0;
}

.deselect-btn a {
  color: var(--primary-color);
}

.filter-section-header {
  display: flex;
  justify-content: space-between;
}

.filter-section-btn {
  width: 30px;
}

.section-title {
  margin: 10px 0;
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
  padding-left: 25px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 16px;
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
  height: 16px;
  width: 16px;
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
  left: 5px;
  top: 1px;
  width: 4px;
  height: 10px;
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
  height: 18px;
  width: 18px;
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
  top: 6px;
  left: 6px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: white;
}

</style>
