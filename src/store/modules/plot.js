/* eslint-disable no-unused-vars */
export default {
  state: {
    plotPoint: 0,
    disableControls: false,

    tabs: [
      { name: 'shenanigans', title: 'Shenanigans', unlockPoint: 0 },
      { name: 'self', title: 'Self', unlockPoint: 4 },
      { name: 'shelter', title: 'Shelter', unlockPoint: 5 }
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
      return state.tabs.filter((tab) => state.plotPoint >= tab.unlockPoint)
    }
  },

  mutations: {
    incrementPlotPoint(state) {
      state.plotPoint++
    },

    disableControls(state) {
      state.disableControls = true
    },

    enableControls(state) {
      state.disableControls = false
    }
  },

  actions: {
    advancePlot({ commit }) {
      commit('disableControls')
      commit('incrementPlotPoint')
      commit('enableControls')
    }
  }
}
