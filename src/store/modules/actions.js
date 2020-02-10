/* eslint-disable no-unused-vars */
export default {
  state: {
    actions: {
      makeCamp: {
        title: 'Make a Camp',
        link: 'makeCamp',
        type: 'plot',
        unlocked: true,
        tooltipText: 'Clear a camping spot from stones and dust.'
      },

      scavengeShrooms: {
        title: 'Scavenge for Shrooms',
        link: 'scavengeShrooms',
        type: 'resource',
        unlocked: false,
        effect: [{ resource: 'shrooms', amount: 10 }],
        tooltipText: 'Gather juicy bulbs and budges.',
        tooltipFlavor: "'Juicy! Jummy!'"
      },

      seekSticks: {
        title: 'Seek Sticks',
        link: 'seekSticks',
        type: 'resource',
        unlocked: false,
        effect: [{ resource: 'shrooms', amount: 1 }],
        cost: [{ resource: 'batshit', amount: 1 }],
        tooltipText: 'Prepare strong sticks.'
      },

      contemplate: {
        title: 'Contemplate Cave Life',
        link: 'contemplate',
        type: 'resource',
        unlocked: false,
        effect: [{ resource: 'insight', amount: 1 }],
        tooltipText: 'Stare into darkness, thinking about better living and quality-of-life improvements.'
      }
    }
  },

  getters: {
    actions(state) {
      return state.actions
    },

    actionsUnlocked(state) {
      let arr = []

      for (let action in state.actions) {
        if (state.actions[action].unlocked) {
          arr.push(state.actions[action])
        }
      }

      return arr
    }
  },

  mutations: {
    remember_actions(state, savedActions) {
      state.actions = savedActions
    },

    lock_actions(state, link) {
      state.actions[link].unlocked = false
    },

    unlock_actions(state, link) {
      state.actions[link].unlocked = true
    }
  },

  actions: {
    runAction({ state, commit, dispatch }, link) {
      const action = state.actions[link]

      if (action.type === 'plot') {
        dispatch('advancePlot')
        commit('lock_actions', link)
        dispatch('actionUnlocks', link)
        return
      }

      // Apply action effects
      if (action.effect) {
        dispatch('applyEffects', { category: 'actions', link: link })
      }

      // Deduce action costs
      if (action.cost) dispatch('applyCosts', { category: 'actions', link: link })
    },

    actionUnlocks({ state, commit }, link) {
      switch (link) {
        // First actions unlocks
        case 'makeCamp':
          commit('unlock_actions', 'scavengeShrooms')
          break
        case 'two':
          console.log('two')
          break
        default:
          break
      }
    }
  }
}
