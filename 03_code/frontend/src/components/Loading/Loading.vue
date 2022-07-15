<template>
  <div class="loading">
    <div class="loading-bar">
      <div>
        <img src="../../assets/HEIG-VD_logotype_rouge-rvb.svg" class="logo" alt="logo HEIG-VD">
        <h1 class="loading-title">
          Plans
        </h1>
      </div>
      <p class="loading-text" v-show="!isLoadingComplete">
        Chargement...
      </p>
      <a v-show="isLoadingComplete" href="#" @click="enterApp">
        <div class="loading-btn">
          <p>Entrer</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "../Utility/Button.vue";

const props = defineProps<{
  isLoadingComplete : boolean
}>()

const emit = defineEmits(['appEntered'])

function enterApp() {
  emit('appEntered')
}

</script>

<style scoped>
.loading {
  position: absolute;
  background-image: url("https://www.yverdon-energies.ch/wp-content/uploads/2019/05/heig-vd-cheseaux.jpg");
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 30;
  background-color: var(--primary-background-color);
  background-size: cover;
  background-position: center;
}

.loading-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: clamp(360px, 33%, 440px);
  background-color: var(--primary-background-color);
  padding: 5rem;
}

.loading-title {
  width: 100%;
  margin-top: 10px;
  font-size: 4em;
  color: var(--font-color);
}

.logo {
  width: 100%;
  margin-bottom: 1rem;
}

.loading-text {
  height: 50px;
  font-size: 20px;
}

.loading-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 3px;
}

a {
  text-decoration: none;
}

.loading-btn p{
  display: block;
  color: var(--font-color);

}

.loading-btn:hover {
  background-color: var(--border-color);
}

@media  only screen and (max-width: 440px) {

  .loading-bar {
    width: 100%;
  }

  .loading-title {
    font-size: 3em;
    margin-top: 10px;
    color: var(--font-color);
  }

}

</style>
