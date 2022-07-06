<template>
  <div class="collapse-header">
    <h2 class="collapse-title">{{ title }}</h2>
    <Button v-show="visibility" class="collapse-btn" @click="changeVisibility" id="openedIcon">
      <font-awesome-icon :icon="['fas', 'angle-down']" />
    </Button>
    <Button v-show="!visibility" class="collapse-btn" @click="changeVisibility" id="closedIcon">
      <font-awesome-icon :icon="['fas', 'angle-right']" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Button from "./Button.vue";

const props = defineProps<{
  title : string
}>()

const emit = defineEmits(['change'])

const visibility = ref(false)

function changeVisibility() {
  visibility.value = !visibility.value
  emit('change', visibility.value)
}


</script>

<style scoped>

.collapse-header {
  display: flex;
  justify-content: space-between;
}

.collapse-title {
  font-size: 16px;
  margin: 10px 0;
}

.collapse-btn {
  width: 30px;
}

</style>
