/* eslint-disable no-unused-vars */
export default {
  state: {
    fps: 2
  },

  getters: {
    fps(state) {
      return state.fps
    },

    getSaveData(state, rootState) {
      return {
        plot: rootState.plot,
        logs: rootState.logs,

        resources: rootState.resources,
        actions: rootState.actions,
        tasks: rootState.tasks,
        activeTask: rootState.activeTask,
        upgrades: rootState.upgrades,

        self: rootState.self
      }
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
              dispatch('pushLogs', { category: category, link: item, type: 'unlock' })
            }
          }

          // ToDo: Link type trigger
        }
      }

      // Check for resource unlocks
      for (let item in rootGetters.resources) {
        if (!rootGetters.resources[item].unlocked && rootGetters.resources[item].count) commit('unlock_resources', item)
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

    applyEffectsOnce({ state, commit, dispatch, rootGetters }, event) {
      // event: { category: String, link: String }
      for (let i = 0; i < rootGetters[event.category][event.link].effect.length; i++) {
        let effect = rootGetters[event.category][event.link].effect[i]

        // Apply effect based on effect type
        // 1. Unlocks
        if (effect.unlock) {
          commit('unlock_' + effect.category, effect.link) // unlock target

          // 2. Resource effects
        } else if (effect.resource) {
          commit('addResource', { resource: effect.resource, amount: effect.amount })

          // 3. Multiply or add
        } else if (effect.multiply || effect.add) {
          dispatch('mathTargetAttribute', {
            type: effect.multiply ? 'multiply' : 'add',
            category: effect.category,
            link: effect.link,
            target: effect.target,
            subtarget: effect.subtarget,
            amount: effect.amount
          })
          // 0. Other
        } else console.warn('applyEffectsOnce: unknown effect type!')
      }
    },

    // Calculate new attribute value and commit mutations
    mathTargetAttribute({ state, commit, rootGetters }, item) {
      let targetAmount = null
      let resultAmount = null
      let attrIndex = null

      // Get target value
      if (item.subtarget) {
        let target = rootGetters[item.category][item.link][item.target]
        // category: 'tasks', link: 'shovelBatshit', target: 'effect', subtarget: 'batshit'
        for (let i = 0; i < target.length; i++) {
          if (target[i].resource === item.subtarget) {
            targetAmount = target[i].amount
            attrIndex = i
          }
        }
      } else {
        targetAmount = rootGetters[item.category][item.link][item.target] // resources.shrooms.cap
      }

      // Get final number
      if (item.type === 'multiply') resultAmount = targetAmount * item.amount
      else if (item.type === 'add') resultAmount = targetAmount + item.amount

      commit('modify_' + item.category, {
        link: item.link,
        attrType: item.target,
        attrIndex: attrIndex,
        amount: resultAmount
      })
    },

    loadSave({ state, commit }, saveData) {
      const thingsToRemember = ['plot', 'logs', 'resources', 'actions', 'tasks', 'upgrades', 'self']
      // Remember stuff from the list above
      thingsToRemember.forEach((i) => commit('remember_' + i, saveData[i]))
      // Remember specific things
      commit('toggleTask', saveData.activeTask)
    },

    round({ state }, value) {
      return Number(Math.round(value + 'e4') + 'e-4')
    }
  }
}
