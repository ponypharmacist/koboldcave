/* eslint-disable no-unused-vars */
export default {
  state: {
    resources: {
      // ToDo: flesh ?, shards, sharp stones, shinies

      shekels: {
        title: 'Shekels',
        unlocked: true,
        count: 8,
        countRound: 8,
        rate: 0,
        cap: 10
      },
      shrooms: {
        title: 'Shrooms',
        unlocked: false,
        count: 0,
        countRound: 0,
        rate: 0,
        cap: 200
      },
      batshit: {
        title: 'Bat Shit',
        unlocked: false,
        count: 0,
        countRound: 0,
        rate: 0,
        cap: 200
      },
      skins: {
        title: 'Skins',
        unlocked: true,
        count: 10,
        countRound: 10,
        rate: 0,
        cap: 20
      },
      stones: {
        title: 'Stones',
        unlocked: true,
        count: 10,
        countRound: 10,
        rate: 0,
        cap: 20
      },
      shroomwood: {
        title: 'Shroom Wood',
        unlocked: true,
        count: 10,
        countRound: 10,
        rate: 0,
        cap: 20,
        tooltipFlavor: 'There are no trees underground, though some shrooms grow mighty thick.'
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
    remember_resources(state, payload) {
      state.resources = payload
    },

    addResource(state, payload) {
      let resource = state.resources[payload.resource]
      let newCount = Number(Math.round(resource.count + payload.amount + 'e4') + 'e-4')

      if (newCount >= resource.cap) newCount = resource.cap
      if (newCount <= 0) newCount = 0

      resource.count = newCount
      if (resource.countRound !== Math.floor(newCount)) resource.countRound = Math.floor(newCount)
    },

    unlock_resources(state, unlock) {
      state.resources[unlock.link].unlocked = true
    },

    modify_resources(state, item) {
      // item = {
      // link: String,
      // attrType: String,
      // amount: Number
      // }
      state.resources[item.link][item.attrType] = item.amount
    }
  },

  actions: {
    updateResourcesWithRate({ state, commit, rootGetters }) {
      for (const res in state.resources) {
        if (state.resources[res].rate) {
          commit('addResource', { resource: res, amount: state.resources[res].rate / rootGetters.fps })
        }
      }
    }
  }
}
