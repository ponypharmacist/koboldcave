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
        targets: [
          {
            upgrade: 'sturdyShovels',
            category: 'tasks',
            link: 'shovelBatshit',
            type: 'modifier',
            modifierType: 'effect',
            resource: 'batshit',
            amount: 4
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
        cost: [{ resource: 'shrooms', amount: 10 }],
        targets: [
          {
            upgrade: 'shroomPlots',
            category: 'producers',
            link: 'shroomPlot',
            type: 'unlock'
          }
        ],
        tooltipText: 'A way to fertilize cave walls with moisture and guano.',
        unlockMessage: 'Maybe shrooms will grow better that way...',
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

    buy_upgrades(state, link) {
      state.upgrades[link].bought = true
    }
  },

  actions: {
    buy_upgrades({ state, commit }, link) {
      commit('buy_upgrades', link)
      commit('pushLog', state.upgrades[link].boughtMessage)
    },

    runUpgrade({ state, commit, dispatch, rootGetters }, targets) {
      for (let i in targets) {
        let target = targets[i]
        switch (target.type) {
          case 'unlock':
            // target: {
            //   upgrade: 'shroomPlots',
            //   category: 'producers',
            //   link: 'shroomPlot',
            //   type: 'unlock'
            // }
            commit('unlock_' + target.category, target.link)
            dispatch('buy_upgrades', target.upgrade)
            break
          case 'modifier':
            // target: {
            //   upgrade: 'sturdyShovels',
            //   category: 'tasks',
            //   link: 'shovelBatshit',
            //   type: 'modifier',
            //   modifierType: 'effect',
            //   resource: 'batshit',
            //   amount: 4
            // }
            for (let i = 0; i < rootGetters[target.category][target.link][target.modifierType].length; i++) {
              if (rootGetters[target.category][target.link][target.modifierType][i].resource === target.resource) {
                commit('modify_' + target.category, {
                  link: target.link,
                  attrType: target.modifierType,
                  attrIndex: i,
                  amount: target.amount
                })
              }
            }
            dispatch('buy_upgrades', target.upgrade)
            break
          default:
            console.log('No applicable upgrade target in runUpgrade()')
            break
        }
      }
      dispatch('applyCosts', { category: 'upgrades', link: targets[0].upgrade })
    }
  }
}
