import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import sidebar from './modules/sidebar'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    sidebar
  },
  plugins: [createPersistedState()],
});
