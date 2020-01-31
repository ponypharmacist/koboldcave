/* eslint-disable no-unused-vars */
export default {
  state: {
    shrooms: {
      title: 'Shrooms',
      unlocked: true,
      count: 0,
      countRound: 0,
      rate: 0,
      cap: 100
    },
    batshit: {
      title: 'Bat Shit',
      unlocked: true,
      count: 0,
      countRound: 0,
      rate: 0,
      cap: 100
    },
    insight: {
      title: 'Insight',
      unlocked: false,
      count: 0,
      countRound: 0,
      rate: 0,
      cap: 10
    }
  },

  getters: {
    resources(state) {
      return state
    }
  },

  mutations: {
    addResource(state, payload) {
      let resource = state[payload.resource]

      if (resource.count >= resource.cap) return

      let newCount = Number(Math.round(resource.count + payload.amount + 'e4') + 'e-4')

      if (newCount >= resource.cap) newCount = resource.cap
      if (newCount <= 0) newCount = 0

      resource.count = newCount
      if (resource.countRound !== Math.floor(newCount)) resource.countRound = Math.floor(newCount)
    },

    setResourceRate(state, payload) {
      state[payload.resource].rate = payload.rate
    },

    unlockResource(state, resource) {
      state[resource].unlocked = true
    }
  },

  actions: {
    updateResourceRates({ state, dispatch }) {
      for (let resource in state) {
        dispatch('calculateResourceRate', resource)
      }
    },

    updateResourcesWithRate({ state, commit, rootGetters }) {
      for (const res in state) {
        if (state[res].rate) {
          commit('addResource', { resource: res, amount: state[res].rate / rootGetters.fps })
        }
      }
    }
  }
}
