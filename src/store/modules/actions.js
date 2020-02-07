/* eslint-disable no-unused-vars */
export default {
  state: {
    actions: {
      scavengeShrooms: {
        title: 'Scavenge for Shrooms',
        link: 'scavengeShrooms',
        effect: [
          { resource: 'shrooms', amount: 100 },
          { resource: 'batshit', amount: 100 }
        ],
        tooltipText: 'Gather juicy bulbs and budges.',
        tooltipFlavor: "'Juicy! Jummy!'"
      },
      seekSticks: {
        title: 'Seek Sticks',
        link: 'seekSticks',
        effect: [{ resource: 'shrooms', amount: 1 }],
        cost: [{ resource: 'batshit', amount: 1 }],
        tooltipText: 'Prepare strong sticks.'
      },
      contemplate: {
        title: 'Contemplate Cave Life',
        link: 'contemplate',
        effect: [{ resource: 'insight', amount: 1 }],
        tooltipText: 'Stare into darkness, thinking about better living and quality-of-life improvements.'
      },
      makeNoise: {
        title: 'Make noise',
        link: 'makeNoise',
        effect: [{ resource: 'batshit', amount: 1 }],
        tooltipText: 'Woof-woof.'
      }
    }
  },

  getters: {
    actions(state) {
      return state.actions
    }
  },

  mutations: {},

  actions: {
    runAction({ state, dispatch }, link) {
      // Apply action effects
      if (state.actions[link].effect) dispatch('applyEffects', { category: 'actions', link: link })
      // Deduce action costs
      if (state.actions[link].cost) dispatch('applyCosts', { category: 'actions', link: link })
      // Check if it unlocks resources
      dispatch('checkEventUnlocksResource', { category: 'actions', link: link })
    }
  }
}
