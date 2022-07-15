<template>
  <div class="collapse-header">
    <Button @click="changeVisibility">
      <div class="collapse-header-container">
        <h2 class="collapse-title">{{ title }}</h2>
        <div class="collapse-icon">
          <transition name="open">
              <font-awesome-icon v-show="visibility" :icon="['fas', 'angle-down']" />
          </transition>
          <transition name="close">
              <font-awesome-icon v-show="!visibility" :icon="['fas', 'angle-right']" />
          </transition>
        </div>
      </div>
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

.collapse-header-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.open-enter-active {
  transition: transform 0.2s ease-out;
}


.open-enter-from {
  transform: rotate(-90deg);
}
.open-leave-from {
  opacity: 0;
}


.close-enter-active {
  transition: transform 0.2s ease-out
}

.close-enter-from {
  transform: rotate(90deg);
}

.close-leave-from {
  opacity: 0;
}

</style>
