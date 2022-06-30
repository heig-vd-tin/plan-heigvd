import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown, faAngleUp, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faAngleUp, faAngleDown, faBars, faXmark );

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

app.component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
