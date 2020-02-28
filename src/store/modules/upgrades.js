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
      },

      positiveThinking: {
        title: 'Positive Thinking',
        link: 'positiveThinking',
        unlocked: true,
        bought: false,
        cost: [{ resource: 'insight', amount: 10 }],
        effect: [{ add: true, category: 'bars', link: 'motivation', target: 'baseRate', amount: 0.1, title: '+0.1 motivation per second' }],
        tooltipText: "Be positive, don't be negative.",
        boughtMessage: 'You discover wonders of <b class="highlight">positive thinking</b>.'
      },

      craftstation1: {
        title: 'Unlock CStation',
        link: 'craftstation1',
        unlocked: true,
        bought: false,
        cost: [{ resource: 'shrooms', amount: 5 }],
        effect: [{ unlock: true, category: 'buildings', link: 'craftstation', tier: 1 }],
        tooltipText: 'Unlock craftstation.',
        boughtMessage: '<b class="highlight">Craftstation</b> unlocked.'
      },

      craftstation2: {
        title: 'Unlock CStation II',
        link: 'craftstation2',
        unlocked: true,
        bought: false,
        cost: [{ resource: 'shrooms', amount: 5 }],
        effect: [{ unlock: true, category: 'buildings', link: 'craftstation', tier: 2 }],
        tooltipText: 'Unlock tier II craftstation.',
        boughtMessage: '<b class="highlight">Craftstation II</b> unlocked.'
      },

      craftstation3: {
        title: 'Unlock CStation III',
        link: 'craftstation3',
        unlocked: true,
        bought: false,
        cost: [{ resource: 'shrooms', amount: 5 }],
        effect: [{ unlock: true, category: 'buildings', link: 'craftstation', tier: 3 }],
        tooltipText: 'Unlock tier III craftstation.',
        boughtMessage: '<b class="highlight">Craftstation III</b> unlocked.'
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

    unlock_upgrades(state, unlock) {
      state.upgrades[unlock.link].unlocked = true
    },

    block_upgrades(state, link) {
      state.upgrades[link].bought = true
    }
  },

  actions: {
    runUpgrade({ state, commit, dispatch, rootGetters }, link) {
      // Apply costs
      dispatch('applyCostsOnce', { category: 'upgrades', link: link })
      // Apply effects
      dispatch('applyEffectsOnce', { category: 'upgrades', link: link })
      // Disable source upgrade
      commit('block_upgrades', link)
      // Push upgrade bought message
      commit('pushLog', state.upgrades[link].boughtMessage)
    }
  }
}
