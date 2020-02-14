/* eslint-disable no-unused-vars */
export default {
  state: {
    producers: {
      shroomPlot: {
        title: 'Shroom Plot',
        link: 'shroomPlot',
        unlocked: true,
        number: 0,
        numberMax: 4,
        // eslint-disable-next-line prettier/prettier
        produces: [
          { resource: 'shrooms', amount: 1 }
        ],
        // eslint-disable-next-line prettier/prettier
        consumes: [
          { resource: 'batshit', amount: 0.1 }
        ],
        tooltipText: 'Small plot of cavestone fertilized with bat shit.'
      }
    }
  },

  getters: {
    producers(state) {
      let arr = []

      for (const prod in state.producers) {
        let isUnlocked = state.producers[prod].unlocked

        if (isUnlocked) arr.push(state.producers[prod])
      }

      return arr
    }
  },

  mutations: {
    addProducer(state, payload) {
      state.producers[payload].number++
    },

    removeProducer(state, payload) {
      state.producers[payload].number--
    },

    unlock_producers(state, link) {
      state.producers[link].unlocked = true
    },

    modify_producers(state, item) {
      // item = {
      // link: String,
      // attrType: String,
      // attrIndex: attrIndex,
      // amount: Number
      // }
      if (item.attrIndex >= 0) {
        state.producers[item.link][item.attrType][item.attrIndex].amount = item.amount
      } else {
        state.producers[item.link][item.attrType] = item.amount
      }
    }
  },

  actions: {
    addProducer({ state, commit, dispatch }, payload) {
      let producer = state.producers[payload]

      if (producer.number < producer.numberMax) commit('addProducer', payload)

      dispatch('updateResourceRates')
    },

    removeProducer({ state, commit, dispatch }, payload) {
      let producer = state.producers[payload]

      if (producer.number > 0) commit('removeProducer', payload)

      dispatch('updateResourceRates')
    }
  }
}
