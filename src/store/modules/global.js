/* eslint-disable no-unused-vars */
export default {
  state: {
    fps: 2
  },

  getters: {
    fps(state) {
      return state.fps
    }
  },

  mutations: {},

  actions: {
    // Main updater event that fires every frame
    updateStuff({ state, commit, dispatch, rootGetters }) {
      // Update resources that have rate
      dispatch('updateResourcesWithRate')

      // Commit active task
      if (rootGetters.activeTask) dispatch('runActiveTask', rootGetters.activeTask)

      // Check for unlocks
      dispatch('checkForUnlocks')
    },

    checkForUnlocks({ state, commit, dispatch, rootGetters }) {
      const categories = ['tasks', 'upgrades']

      for (let category of categories) {
        for (let item in rootGetters[category]) {
          // Resource type trigger
          if (
            !rootGetters[category][item].unlocked &&
            rootGetters[category][item].trigger &&
            rootGetters[category][item].trigger.resource
          ) {
            let resource = rootGetters[category][item].trigger.resource
            let amount = rootGetters[category][item].trigger.amount

            if (rootGetters.resources[resource].countRound >= amount) {
              commit('unlock_' + category, item)
              // ToDo: make these logs more specific
              dispatch('pushLogs', { category: category, link: item, type: 'unlock' })
            }
          }

          // ToDo: Link type trigger
        }
      }
    },

    checkEventUnlocksResource({ state, commit, rootGetters }, event) {
      for (let i = 0; i < rootGetters[event.category][event.link].effect.length; i++) {
        let effect = rootGetters[event.category][event.link].effect[i]
        if (!rootGetters.resources[effect.resource].unlocked) commit('unlockResource', effect.resource)
      }
    },

    // Cost is an array
    applyCosts({ state, commit, rootGetters }, event) {
      // event = {
      //   category: String,
      //   link: String
      // }
      let divider = event.category === 'actions' || event.category === 'upgrades' ? 1 : state.fps

      for (let i = 0; i < rootGetters[event.category][event.link].cost.length; i++) {
        let cost = rootGetters[event.category][event.link].cost[i]
        commit('addResource', { resource: cost.resource, amount: 0 - cost.amount / divider })
      }
    },

    applyEffects({ state, commit, rootGetters }, event) {
      // event = {
      //   category: String,
      //   link: String
      // }
      let divider = event.category === 'actions' ? 1 : state.fps
      for (let i = 0; i < rootGetters[event.category][event.link].effect.length; i++) {
        let effect = rootGetters[event.category][event.link].effect[i]
        commit('addResource', { resource: effect.resource, amount: effect.amount / divider })
      }
    },

    loadSave({ state, commit }, saveData) {
      commit('remember_resources', saveData.resources)
      commit('remember_tasks', saveData.tasks)
      commit('toggleTask', saveData.activeTask)
      commit('remember_upgrades', saveData.upgrades)
    },

    round({ state }, value) {
      return Number(Math.round(value + 'e4') + 'e-4')
    }
  }
}
