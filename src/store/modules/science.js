/* eslint-disable no-unused-vars */
export default {
  state: {
    research: {
      toolmaking: {
        title: 'Tool Making',
        link: 'toolmaking',
        active: false,
        unlocked: true,
        bought: false,
        trigger: { resource: 'stones', amount: 20 },
        cost: [{ resource: 'shrooms', amount: 10 }],
        effect: [],
        tooltipText: 'Much more handier than hands.',
        unlockMessage: 'You come up with a better design for your shovel.',
        boughtMessage: 'Now your can shovel more effectively.'
      },

      wheel: {
        title: 'Wheel',
        link: 'wheel',
        active: false,
        unlocked: true,
        bought: false,
        trigger: { resource: 'stones', amount: 20 },
        cost: [{ resource: 'shrooms', amount: 10 }],
        effect: [],
        tooltipText: 'Stone wheel. Fascinating.',
        unlockMessage: 'You come up with a better design for your shovel.',
        boughtMessage: 'Now your can shovel more effectively.'
      }
    }
  },

  getters: {
    research(state) {
      return state.research
    },

    researchUnlocked(state) {
      return Object.values(state.research).filter((tech) => tech.unlocked && !tech.bought)
    }
  },

  mutations: {
    research(state, payload) {
      state.research = payload
    },

    unlock_research(state, unlock) {
      state.research[unlock.link].unlocked = true
    },

    block_research(state, link) {
      state.research[link].bought = true
    }
  },

  actions: {}
}
