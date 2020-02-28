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

      huntSkins: {
        title: 'Hunt Skinny Critters',
        link: 'huntSkins',
        type: 'resource',
        unlocked: true,
        effect: [{ resource: 'skins', amount: 1 }],
        tooltipText: 'Smack, skewer and skin.'
      },

      stackStones: {
        title: 'Stack Stones',
        link: 'stackStones',
        type: 'resource',
        unlocked: true,
        effect: [{ resource: 'stones', amount: 1 }],
        tooltipText: 'Smack, skewer and skin.'
      },

      chopShroomWood: {
        title: 'Chop Shroom Wood',
        link: 'chopShroomWood',
        type: 'resource',
        unlocked: true,
        effect: [{ resource: 'shroomwood', amount: 1 }],
        tooltipText: 'Smack, skewer and skin.'
      },

      spinWebs: {
        title: 'Spin Silky Webs',
        link: 'spinWebs',
        type: 'resource',
        unlocked: true,
        effect: [{ resource: 'spiderstring', amount: 1 }],
        tooltipText: 'Make sure, there is no spider near.'
      },

      contemplate: {
        title: 'Contemplate Cave Life',
        link: 'contemplate',
        type: 'resource',
        unlocked: false,
        effect: [{ resource: 'insight', amount: 1 }],
        tooltipText: 'Stare into darkness, thinking about better living and quality-of-life improvements.'
      },

      trainPower: {
        title: 'Train Power',
        link: 'trainPower',
        type: 'progress',
        unlocked: true,
        effect: [{ stats: 'power', progress: 1 }],
        tooltipText: 'Stare into darkness, thinking about better living and quality-of-life improvements.'
      },

      trainFarming: {
        title: 'Train Farming',
        link: 'trainFarming',
        type: 'progress',
        unlocked: true,
        effect: [{ skills: 'farming', progress: 1 }],
        tooltipText: 'Push your shovel-jitsu to the limits.'
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

    unlock_actions(state, unlock) {
      state.actions[unlock.link].unlocked = true
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
      if (action.effect) dispatch('applyEffectsOnce', { category: 'actions', link: link })

      // Deduce action costs
      if (action.cost) dispatch('applyCostsOnce', { category: 'actions', link: link })
    },

    // List of plot-related unlocks triggered by (action.type: 'plot')
    actionUnlocks({ state, commit }, link) {
      switch (link) {
        // First actions unlocks
        case 'makeCamp':
          commit('unlock_actions', { link: 'scavengeShrooms' })
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
