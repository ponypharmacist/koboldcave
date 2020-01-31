/* eslint-disable no-unused-vars */
export default {
  state: {
    fps: 2,

    actions: {
      scavengeShrooms: {
        title: 'Scavenge for Shrooms',
        link: 'scavengeShrooms',
        effect: [
          { resource: 'shrooms', amount: 1 },
          { resource: 'batshit', amount: 1 }
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
    },

    activeTask: null,
    tasks: {
      doNothing: {
        title: 'Do Nothing',
        link: null,
        tooltipText: 'Just chill.'
      },
      shovelBatshit: {
        title: 'Shovel Bat Shit',
        link: 'shovelBatshit',
        effect: [{ resource: 'batshit', amount: 0.4 }],
        cost: [{ resource: 'shrooms', amount: 0.1 }],
        tooltipText: 'Gather that precious guano.'
      }
    },

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
    },

    producers: {
      shroomPlot: {
        title: 'Shroom Plot',
        link: 'shroomPlot',
        unlocked: false,
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
    fps(state) {
      return state.fps
    },

    actions(state) {
      return state.actions
    },

    tasks(state) {
      return state.tasks
    },

    activeTask(state) {
      return state.activeTask
    },

    upgrades(state) {
      return state.upgrades
    },

    producersList(state) {
      let arr = []

      for (const prod in state.producers) {
        let isUnlocked = state.producers[prod].unlocked

        if (isUnlocked) arr.push(state.producers[prod])
      }

      return arr
    }
  },

  mutations: {
    toggleTask(state, payload) {
      state.activeTask = state.activeTask == payload ? null : payload
    },

    upgradeAvailable(state, payload) {
      state.upgrades[payload].available = true
    },

    unlockItem(state, item) {
      // item = {
      //   category: String,
      //   link: String
      // }
      state[item.category][item.link].unlocked = true
    },

    modifyItemEffect(state, item) {
      // item = {
      //  category: String,
      //  link: String,
      //  attrType: String,
      //  attrIndex: String,
      //  amount: Number
      // }
      let target = state[item.category][item.link][item.attrType][item.attrIndex]
      target.amount = target.amount * item.amount
    },

    addProducer(state, payload) {
      state.producers[payload].number++
    },

    removeProducer(state, payload) {
      state.producers[payload].number--
    }
  },

  actions: {
    // Main updater event that fires every frame
    updateStuff({ state, commit, dispatch }) {
      // Update resources that have rate
      dispatch('updateResourcesWithRate')

      // Commit active task
      if (state.activeTask) dispatch('runActiveTask', state.activeTask)

      // Check upgrade availability
      dispatch('checkAvailableUpgrades')
    },

    checkAvailableUpgrades({ state, commit, rootGetters }) {
      for (const upgrade in state.upgrades) {
        let up = state.upgrades[upgrade]

        if (!up.available && rootGetters.resources[up.trigger.resource].countRound >= up.trigger.amount) {
          commit('upgradeAvailable', upgrade)
        }
      }
    },

    runAction({ state, dispatch }, link) {
      // Apply action effects
      if (state.actions[link].effect) dispatch('applyEffects', { category: 'actions', link: link })
      // Deduce action costs
      if (state.actions[link].cost) dispatch('applyCosts', { category: 'actions', link: link })
      // Check if it unlocks resources
      dispatch('checkEventUnlocksResource', { category: 'actions', link: link })
    },

    checkEventUnlocksResource({ state, commit, rootGetters }, event) {
      for (let i = 0; i < state[event.category][event.link].effect.length; i++) {
        let effect = state[event.category][event.link].effect[i]
        if (!rootGetters.resources[effect.resource].unlocked) commit('unlockResource', effect.resource)
      }
    },

    runUpgrade({ state, commit, dispatch }, targets) {
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
            commit('unlockItem', { category: target.category, link: target.link })
            commit('unlockItem', { category: 'upgrades', link: target.upgrade })
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
            for (let i = 0; i < state[target.category][target.link][target.modifierType].length; i++) {
              if (state[target.category][target.link][target.modifierType][i].resource === target.resource) {
                commit('modifyItemEffect', {
                  category: target.category,
                  link: target.link,
                  attrType: target.modifierType,
                  attrIndex: i,
                  amount: target.amount
                })
              }
            }
            commit('unlockItem', { category: 'upgrades', link: target.upgrade })
            break
          default:
            console.log('No applicable upgrade target in runUpgrade()')
            break
        }
      }
      dispatch('applyCosts', { category: 'upgrades', link: targets[0].upgrade })
    },

    runActiveTask({ state, commit, dispatch, rootGetters }, link) {
      if (state.tasks[link].cost) {
        for (let i = 0; i < state.tasks[link].cost.length; i++) {
          let price = state.tasks[link].cost[i]
          if (rootGetters.resources[price.resource].countRound < price.amount) {
            commit('toggleTask', link)
            return
          }
        }
        dispatch('applyCosts', { category: 'tasks', link: link })
      }

      if (state.tasks[link].effect) {
        dispatch('applyEffects', { category: 'tasks', link: link })
      } else console.log('Active task is available but has no effect?')
    },

    // Cost is an array
    applyCosts({ state, commit }, event) {
      // event = {
      //   category: String,
      //   link: String
      // }
      let divider = event.category === 'actions' || event.category === 'upgrades' ? 1 : state.fps
      for (let i = 0; i < state[event.category][event.link].cost.length; i++) {
        let cost = state[event.category][event.link].cost[i]
        commit('addResource', { resource: cost.resource, amount: 0 - cost.amount / divider })
      }
    },

    applyEffects({ state, commit }, event) {
      let divider = event.category === 'actions' ? 1 : state.fps
      for (let i = 0; i < state[event.category][event.link].effect.length; i++) {
        let effect = state[event.category][event.link].effect[i]
        commit('addResource', { resource: effect.resource, amount: effect.amount / divider })
      }
    },

    addProducer({ state, commit, dispatch }, payload) {
      let producer = state.producers[payload]

      if (producer.number < producer.numberMax) commit('addProducer', payload)

      dispatch('updateResourceRates')
    },

    removeProducer({ state, commit, dispatch }, payload) {
      let producer = state.producers[payload]

      if (producer.number > 0) commit('removeProducer', payload)

      dispatch('updateResourceRates')
    },

    // eslint-disable-next-line sonarjs/cognitive-complexity
    calculateResourceRate({ state, commit, dispatch }, resource) {
      let rateTotal = 0

      for (const item in state.producers) {
        let producer = state.producers[item]
        // Poll only from active producers
        if (producer.number && producer.produces) {
          for (let produce of producer.produces) {
            if (produce.resource === resource) rateTotal = rateTotal + produce.amount * producer.number
          }
        }

        if (producer.number && producer.consumes) {
          for (let consume of producer.consumes) {
            if (consume.resource === resource) rateTotal = rateTotal - consume.amount * producer.number
          }
        }
      }
      commit('setResourceRate', { resource: resource, rate: Number(Math.round(rateTotal + 'e4') + 'e-4') })
    },

    round({ state }, value) {
      return Number(Math.round(value + 'e4') + 'e-4')
    }
  }
}
