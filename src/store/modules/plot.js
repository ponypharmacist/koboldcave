/* eslint-disable no-unused-vars */
export default {
  state: {
    plotPoint: 0,
    disableControls: false,

    tabs: [
      { name: 'shenanigans', title: 'Shenanigans' },
      { name: 'shelter', title: 'Shelter' }
    ]
  },

  getters: {
    plotPoint(state) {
      return state.plotPoint
    },

    disableControls(state) {
      return state.disableControls
    },

    tabs(state) {
      return state.tabs
    }
  },

  mutations: {
    incrementPlotPoint(state) {
      state.plotPoint++
    },

    disableControls(state) {
      state.disableControls = false
    },

    enableControls(state) {
      state.disableControls = true
    }
  },

  actions: {
    advancePlot({ state, commit }, link) {
      commit('disableControls')
      commit('incrementPlotPoint')
    }
  }
}
