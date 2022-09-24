// Collapse menu component used through the program

<template>
  <CollapseHeader
      :title="title"
      @change="change"
      id="collapse-header"
  />
  <transition name="collapse-body">
    <div
        class="collapse-body"
        v-show="visibility"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
import CollapseHeader from "./CollapseHeader.vue";
import {ref} from "vue";

const props = defineProps<{
  title : string
}>()

const visibility = ref(false)

function change(isVisible : boolean) {
  visibility.value = isVisible
}

</script>

<style scoped>

.collapse-body-enter-active,
.collapse-body-leave-active {
  transition: all 0.3s ease-out;
}

.collapse-body-enter-from,
.collapse-body-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}


</style>
