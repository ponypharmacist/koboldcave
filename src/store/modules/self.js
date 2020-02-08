/* eslint-disable no-unused-vars */
export default {
  state: {
    stats: {
      power: {
        title: 'Power',
        value: 7
      },
      smoothness: {
        title: 'Smoothness',
        value: 15
      },
      vigor: {
        title: 'Vigor',
        value: 9
      },
      smarts: {
        title: 'Smarts',
        value: 8
      },
      shrewdness: {
        title: 'Shrewdness',
        value: 7
      },
      charm: {
        title: 'Charm',
        value: 8
      }
    }
  },

  getters: {
    stats(state) {
      return state.stats
    }
  }
}
