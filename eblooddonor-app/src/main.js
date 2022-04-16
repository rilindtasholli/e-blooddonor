import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import {
  faBars,
  faHome,
  faUser,
  faCircleInfo,
  faMessage,
  faPen,
  faEnvelope,
  faPaperPlane,
  faAddressBook
} from "@fortawesome/free-solid-svg-icons"

const importedIcons = {
  faBars,
  faHome,
  faUser,
  faCircleInfo,
  faMessage,
  faPen,
  faEnvelope,
  faPaperPlane,
  faAddressBook
};

Vue.config.productionTip = false

Vue.component("font-awesome-icon", FontAwesomeIcon)

library.add(importedIcons)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


