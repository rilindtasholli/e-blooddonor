import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBars,
  faHome,
  faUser,
  faUsers,
  faCircleInfo,
  faAddressBook,
  faBullhorn,
  faMapMarkerAlt,
  faDroplet,
  faMessage,
  faPen,
  faEnvelope,
  faPaperPlane,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

const importedIcons = {
  faBars,
  faHome,
  faUser,
  faUsers,
  faCircleInfo,
  faAddressBook,
  faBullhorn,
  faMapMarkerAlt,
  faDroplet,
  faMessage,
  faPen,
  faEnvelope,
  faPaperPlane,
  faKey,
};

Vue.config.productionTip = false;

Vue.component("font-awesome-icon", FontAwesomeIcon);

library.add(importedIcons);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
