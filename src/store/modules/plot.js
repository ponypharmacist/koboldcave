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
        unlocked: true
      },
      skills: {
        name: 'skills',
        title: 'Skills',
        unlocked: true
      },
      shelter: {
        name: 'shelter',
        title: 'Shelter',
        unlocked: true
      },
      tribe: {
        name: 'tribe',
        title: 'Tribe',
        unlocked: true
      },
      science: {
        name: 'science',
        title: 'Science',
        unlocked: true
      },
      shamanism: {
        name: 'shamanism',
        title: 'Shamanism',
        unlocked: true
      },
      shrine: {
        name: 'shrine',
        title: 'Shrine',
        unlocked: true
      },
      venture: {
        name: 'venture',
        title: 'Venture',
        unlocked: true
      }
    }
  },

  getters: {
    plot(state) {
      return state
    },

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
    remember_plot(state, savedPlot) {
      state = savedPlot
    },

    incrementPlotPoint(state) {
      state.plotPoint++
    },

    disableControls(state) {
      state.disableControls = true
    },

    enableControls(state) {
      state.disableControls = false
    },

    unlock_tabs(state, unlock) {
      state.tabs[unlock.link].unlocked = true
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
