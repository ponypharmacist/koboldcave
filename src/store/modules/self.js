/* eslint-disable no-unused-vars */
export default {
  state: {
    statsProgressModifier: 1.33,
    statsProgressBase: 100,

    rank: 'homeless kobold',

    stats: {
      power: {
        title: 'Power',
        value: 1,
        cap: 4,
        progress: 15
      },
      smoothness: {
        title: 'Smoothness',
        value: 2,
        cap: 7,
        progress: 24
      },
      vigor: {
        title: 'Vigor',
        value: 1,
        cap: 4,
        progress: 30
      },
      smarts: {
        title: 'Smarts',
        value: 2,
        cap: 5,
        progress: 10
      },
      shrewdness: {
        title: 'Shrewdness',
        value: 1,
        cap: 5,
        progress: 0
      },
      charm: {
        title: 'Charm',
        value: 2,
        cap: 4,
        progress: 0
      }
    }
  },

  getters: {
    stats(state) {
      return state.stats
    },

    statsProgressModifier(state) {
      return state.statsProgressModifier
    },

    statsProgressBase(state) {
      return state.statsProgressBase
    }
  }
}
