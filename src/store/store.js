import Vue from 'vue'
import Vuex from 'vuex'

// General stuff
import global from './modules/global'

// Main tab stuff
import resources from './modules/resources'
import actions from './modules/actions'
import tasks from './modules/tasks'
import upgrades from './modules/upgrades'

// Other tabs
import self from './modules/self'
import skills from './modules/skills'
import shelter from './modules/shelter'
import science from './modules/science'
import items from './modules/items'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // General stuff
    global,
    // Main tab stuff
    resources,
    actions,
    tasks,
    upgrades,
    // Other tabs
    self,
    skills,
    shelter,
    science,
    items
  }
})
