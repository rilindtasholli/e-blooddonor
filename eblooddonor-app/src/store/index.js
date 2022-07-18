import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import sidebar from './modules/sidebar'
import data from './modules/data'
import authentication from './modules/authentication'
import user from './modules/user'
import announcement from './modules/announcement'
import appointment from './modules/appointment'
import messages from "./modules/messages"
import logger from "./modules/logger"
import dashboard from "./modules/dashboard"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    sidebar,
    data,
    authentication,
    user,
    announcement,
    appointment,
    messages,
    logger,
    dashboard
  },
  plugins: [createPersistedState()],
});
