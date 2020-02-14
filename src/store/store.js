import Vue from 'vue'
import Vuex from 'vuex'

// General stuff
import global from './modules/global'
import logs from './modules/logs'
import plot from './modules/plot'

// Main tab stuff
import resources from './modules/resources'
import actions from './modules/actions'
import tasks from './modules/tasks'
import upgrades from './modules/upgrades'

// Other tabs
import self from './modules/self'
import shelter from './modules/shelter'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // General stuff
    global,
    logs,
    plot,
    // Main tab stuff
    resources,
    actions,
    tasks,
    upgrades,
    // Other tabs
    self,
    shelter
  }
})
