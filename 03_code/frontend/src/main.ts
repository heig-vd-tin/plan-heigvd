import { createApp } from 'vue'
import App from './App.vue'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faAngleLeft, faBars } from "@fortawesome/free-solid-svg-icons";

library.add(faAngleRight, faAngleLeft, faBars);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App).component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
