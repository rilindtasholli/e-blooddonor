import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const importedIcons = {
  faHome,
  faUser,
};

Vue.config.productionTip = false

Vue.component("font-awesome-icon", FontAwesomeIcon);

library.add(importedIcons);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


