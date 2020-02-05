/* eslint-disable no-unused-vars */
export default {
  state: {
    upgrades: {
      sturdyShovels: {
        title: 'Sturdy Shovels',
        available: false,
        unlocked: false,
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
        tooltipText: '4 times more effective.'
      },
      shroomPlots: {
        title: 'Shroom Plots',
        available: false,
        unlocked: false,
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
        tooltipText: 'A way to fertilize cave walls with moisture and guano.'
      }
    }
  },

  getters: {
    upgrades(state) {
      return state.upgrades
    }
  },

  mutations: {
    remember_upgrades(state, payload) {
      state.upgrades = payload
    },

    upgradeAvailable(state, payload) {
      state.upgrades[payload].available = true
    },

    unlock_upgrades(state, link) {
      state.upgrades[link].unlocked = true
    }
  },

  actions: {
    checkAvailableUpgrades({ state, commit, rootGetters }) {
      for (const upgrade in state.upgrades) {
        let up = state.upgrades[upgrade]

        if (!up.available && rootGetters.resources[up.trigger.resource].countRound >= up.trigger.amount) {
          commit('upgradeAvailable', upgrade)
        }
      }
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
            commit('unlock_upgrades', target.upgrade)
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
            commit('unlock_upgrades', target.upgrade)
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
