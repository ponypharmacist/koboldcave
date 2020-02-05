import Vue from 'vue'
import Vuex from 'vuex'

import global from './modules/global'
import plot from './modules/plot'

import resources from './modules/resources'
import producers from './modules/producers'
import actions from './modules/actions'
import tasks from './modules/tasks'
import upgrades from './modules/upgrades'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global,
    plot,

    resources,
    producers,
    actions,
    tasks,
    upgrades
  }
})
