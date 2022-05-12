import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import sidebar from './modules/sidebar'
import data from './modules/data'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    sidebar,
    data
  },
  plugins: [createPersistedState()],
});
