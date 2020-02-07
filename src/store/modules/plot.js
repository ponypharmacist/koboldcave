/* eslint-disable no-unused-vars */
export default {
  state: {
    plotPoint: 0,
    disableControls: false,

    tabs: [
      { name: 'shenanigans', title: 'Shenanigans', unlockPoint: 0 },
      { name: 'self', title: 'Self', unlockPoint: 3 },
      { name: 'shelter', title: 'Shelter', unlockPoint: 0 }
      // ToDo
      // Tabs: venture, scholars, shamans
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
    advancePlot({ commit }) {
      commit('disableControls')
      commit('incrementPlotPoint')
    }
  }
}
