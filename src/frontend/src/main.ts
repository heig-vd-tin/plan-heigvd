import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown, faAngleUp, faAngleRight, faBars, faXmark, faPlus, faMinus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// add font awesome icon
library.add(faAngleUp, faAngleDown, faAngleRight, faBars, faXmark, faPlus, faMinus, faMagnifyingGlass );

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App)

// add stores
const pinia = createPinia()
app.use(pinia)

app.component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
