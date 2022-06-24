import { createApp } from 'vue'
import App from './App.vue'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown, faAngleUp, faBars } from "@fortawesome/free-solid-svg-icons";

library.add(faAngleUp, faAngleDown, faBars);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App).component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
