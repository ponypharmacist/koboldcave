/* eslint-disable no-unused-vars */
export default {
  state: {
    plotPoint: 5,
    disableControls: false,

    tabs: {
      shenanigans: {
        name: 'shenanigans',
        title: 'Shenanigans',
        unlocked: true
      },
      self: {
        name: 'self',
        title: 'Self',
        unlocked: false
      },
      shelter: {
        name: 'shelter',
        title: 'Shelter',
        unlocked: false
      }
      // ToDo Tabs: venture, scholars, shamans
    }
  },

  getters: {
    plotPoint(state) {
      return state.plotPoint
    },

    disableControls(state) {
      return state.disableControls
    },

    tabs(state) {
      let arr = []

      for (let tab in state.tabs) {
        if (state.tabs[tab].unlocked) arr.push(state.tabs[tab])
      }

      return arr
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
    },

    unlock_tabs(state, link) {
      state.tabs[link].unlocked = true
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
