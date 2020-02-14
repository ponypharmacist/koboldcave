/* eslint-disable no-unused-vars */
export default {
  state: {
    upgrades: {
      sturdyShovels: {
        title: 'Sturdy Shovels',
        link: 'sturdyShovels',
        unlocked: false,
        bought: false,
        trigger: { resource: 'batshit', amount: 2 },
        cost: [{ resource: 'shrooms', amount: 10 }],
        effect: [
          {
            multiply: true,
            category: 'tasks',
            link: 'shovelBatshit',
            target: 'effect',
            subtarget: 'batshit',
            amount: 4,
            title: '4x shovel power!'
          },
          {
            add: true,
            category: 'resources',
            link: 'shrooms',
            target: 'cap',
            subtarget: null,
            amount: 40,
            title: 'More shroom storage'
          }
        ],
        tooltipText: '4 times more effective.',
        unlockMessage: 'You come up with a better design for your shovel.',
        boughtMessage: 'Now your can shovel more effectively.'
      },

      shroomPlots: {
        title: 'Shroom Plots',
        link: 'shroomPlots',
        unlocked: false,
        bought: false,
        trigger: { resource: 'insight', amount: 5 },
        cost: [{ resource: 'insight', amount: 10 }],
        effect: [
          {
            unlock: true,
            category: 'buildings',
            link: 'shroomPlot',
            title: 'Shroom farming plots'
          }
        ],
        tooltipText: 'A way to fertilize cave walls with moisture and guano.',
        unlockMessage: 'Maybe shrooms 🍄 will grow better that way...',
        boughtMessage: 'Upgrade bought'
      }
    }
  },

  getters: {
    upgrades(state) {
      return state.upgrades
    },

    upgradesUnlocked(state) {
      let arr = []

      for (let upgrade in state.upgrades) {
        if (!state.upgrades[upgrade].bought && state.upgrades[upgrade].unlocked) {
          arr.push(state.upgrades[upgrade])
        }
      }

      return arr
    }
  },

  mutations: {
    remember_upgrades(state, payload) {
      state.upgrades = payload
    },

    unlock_upgrades(state, link) {
      state.upgrades[link].unlocked = true
    },

    block_upgrades(state, link) {
      state.upgrades[link].bought = true
    }
  },

  actions: {
    runUpgrade({ state, commit, dispatch, rootGetters }, link) {
      // Apply costs
      dispatch('applyCosts', { category: 'upgrades', link: link })
      // Apply effects
      dispatch('applyEffectsOnce', { category: 'upgrades', link: link })
      // Disable source upgrade
      commit('block_upgrades', link)
      // Push upgrade bought message
      commit('pushLog', state.upgrades[link].boughtMessage)
    }
  }
}
