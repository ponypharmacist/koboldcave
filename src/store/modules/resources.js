/* eslint-disable no-unused-vars */
export default {
  state: {
    resources: {
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
    }
  },

  getters: {
    resources(state) {
      return state.resources
    }
  },

  mutations: {
    addResource(state, payload) {
      let resource = state.resources[payload.resource]

      if (resource.count >= resource.cap) return

      let newCount = Number(Math.round(resource.count + payload.amount + 'e4') + 'e-4')

      if (newCount >= resource.cap) newCount = resource.cap
      if (newCount <= 0) newCount = 0

      resource.count = newCount
      if (resource.countRound !== Math.floor(newCount)) resource.countRound = Math.floor(newCount)
    },

    setResourceRate(state, payload) {
      state.resources[payload.resource].rate = payload.rate
    },

    unlockResource(state, resource) {
      state.resources[resource].unlocked = true
    }
  },

  actions: {
    updateResourceRates({ state, dispatch }) {
      for (let resource in state.resources) {
        dispatch('calculateResourceRate', resource)
      }
    },

    // eslint-disable-next-line sonarjs/cognitive-complexity
    calculateResourceRate({ state, commit, rootGetters }, resource) {
      let rateTotal = 0
      for (const item in rootGetters.producers) {
        let producer = rootGetters.producers[item]
        // Poll only from active producers
        if (producer.number && producer.produces) {
          for (let produce of producer.produces) {
            if (produce.resource === resource) rateTotal = rateTotal + produce.amount * producer.number
          }
        }

        if (producer.number && producer.consumes) {
          for (let consume of producer.consumes) {
            if (consume.resource === resource) rateTotal = rateTotal - consume.amount * producer.number
          }
        }
      }
      commit('setResourceRate', { resource: resource, rate: Number(Math.round(rateTotal + 'e4') + 'e-4') })
    },

    updateResourcesWithRate({ state, commit, rootGetters }) {
      for (const res in state.resources) {
        if (state.resources[res].rate) {
          commit('addResource', { resource: res, amount: state.resources[res].rate / rootGetters.fps })
        }
      }
    }
  }
}
