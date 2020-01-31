import Vue from 'vue'
import Vuex from 'vuex'

import global from './modules/global'
import resources from './modules/resources'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global,
    resources
  }
})
