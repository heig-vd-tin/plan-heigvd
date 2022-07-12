import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown, faAngleUp, faAngleRight, faBars, faXmark, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

library.add(faAngleUp, faAngleDown, faAngleRight, faBars, faXmark, faPlus, faMinus );

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

app.component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
