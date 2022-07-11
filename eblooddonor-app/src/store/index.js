import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import sidebar from './modules/sidebar'
import data from './modules/data'
import authentication from './modules/authentication'
import user from './modules/user'
import announcement from './modules/announcement'
import appointment from './modules/appointment'
import messages from "./modules/messages";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    sidebar,
    data,
    authentication,
    user,
    announcement,
    appointment,
    messages
  },
  plugins: [createPersistedState()],
});
