/* eslint-disable no-unused-vars */
export default {
  state: {
    logs: []
  },

  getters: {
    logs(state) {
      return state.logs
    }
  },

  mutations: {
    remember_logs(state, savedLogs) {
      state.logs = savedLogs
    },

    pushLog(state, text) {
      state.logs.unshift({ text: text })
    }
  },

  actions: {
    pushLogs({ state, commit, rootGetters }, item) {
      // item: { category: String, link: String, type: String }
      const text = rootGetters[item.category][item.link][item.type + 'Message']
      commit('pushLog', text)
    }
  }
}
