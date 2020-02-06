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
    pushLog(state, text) {
      state.logs.unshift({ text: text })
    }
  },

  actions: {
    advancePlot({ state, commit }, link) {
      commit('disableControls')
      commit('incrementPlotPoint')
    }
  }
}
