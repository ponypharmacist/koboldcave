/* eslint-disable no-unused-vars */
export default {
  state: {
    actions: {
      makeCamp: {
        title: 'Make a Camp',
        link: 'makeCamp',
        type: 'plot',
        locked: false,
        tooltipText: 'Clear a camping spot from stones and dust.'
      },

      scavengeShrooms: {
        title: 'Scavenge for Shrooms',
        link: 'scavengeShrooms',
        type: 'resource',
        locked: false,
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
        type: 'resource',
        locked: false,
        effect: [{ resource: 'shrooms', amount: 1 }],
        cost: [{ resource: 'batshit', amount: 1 }],
        tooltipText: 'Prepare strong sticks.'
      },

      contemplate: {
        title: 'Contemplate Cave Life',
        link: 'contemplate',
        type: 'resource',
        locked: false,
        effect: [{ resource: 'insight', amount: 1 }],
        tooltipText: 'Stare into darkness, thinking about better living and quality-of-life improvements.'
      }
    }
  },

  getters: {
    actions(state) {
      return state.actions
    },

    actionsActive(state) {
      let arr = []

      for (let action in state.actions) {
        if (!state.actions[action].locked) {
          arr.push(state.actions[action])
        }
      }

      return arr
    }
  },

  mutations: {
    lockAction(state, link) {
      state.actions[link].locked = true
    }
  },

  actions: {
    runAction({ state, commit, dispatch }, link) {
      const action = state.actions[link]

      if (action.type === 'plot') {
        dispatch('advancePlot')
        commit('lockAction', link)
        return
      }

      // Apply action effects
      if (action.effect) {
        dispatch('applyEffects', { category: 'actions', link: link })
        // Check if it unlocks resources
        dispatch('checkEventUnlocksResource', { category: 'actions', link: link })
      }
      // Deduce action costs
      if (action.cost) dispatch('applyCosts', { category: 'actions', link: link })
    }
  }
}
