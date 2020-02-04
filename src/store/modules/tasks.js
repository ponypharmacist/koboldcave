/* eslint-disable no-unused-vars */
export default {
  state: {
    activeTask: null,
    tasks: {
      doNothing: {
        title: 'Do Nothing',
        link: null,
        tooltipText: 'Just chill.'
      },
      shovelBatshit: {
        title: 'Shovel Bat Shit',
        link: 'shovelBatshit',
        effect: [{ resource: 'batshit', amount: 0.4 }],
        cost: [{ resource: 'shrooms', amount: 0.1 }],
        tooltipText: 'Gather that precious guano.'
      }
    }
  },

  getters: {
    tasks(state) {
      return state.tasks
    },

    activeTask(state) {
      return state.activeTask
    }
  },

  mutations: {
    toggleTask(state, payload) {
      state.activeTask = state.activeTask == payload ? null : payload
    },

    modify_tasks(state, item) {
      // item = {
      //  link: String,
      //  attrType: String,
      //  attrIndex: String,
      //  amount: Number
      // }
      let target = state.tasks[item.link][item.attrType][item.attrIndex]
      target.amount = target.amount * item.amount
    }
  },

  actions: {
    runActiveTask({ state, commit, dispatch, rootGetters }, link) {
      if (state.tasks[link].cost) {
        for (let i = 0; i < state.tasks[link].cost.length; i++) {
          let price = state.tasks[link].cost[i]
          if (rootGetters.resources[price.resource].countRound < price.amount) {
            commit('toggleTask', link)
            return
          }
        }
        dispatch('applyCosts', { category: 'tasks', link: link })
      }

      if (state.tasks[link].effect) {
        dispatch('applyEffects', { category: 'tasks', link: link })
      } else console.log('Active task is available but has no effect?')
    }
  }
}
