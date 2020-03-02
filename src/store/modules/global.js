/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-unused-vars */
export default {
  state: {
    fps: 2,

    gameState: {
      ticksPlayed: 0,
      plotPoint: 5,
      disableControls: false,
      logs: []
    },

    tabs: {
      shenanigans: { title: 'Shenanigans', unlocked: true },
      self: { title: 'Self', unlocked: true },
      skills: { title: 'Skills', unlocked: true },
      shelter: { title: 'Shelter', unlocked: true },
      tribe: { title: 'Tribe', unlocked: true },
      science: { title: 'Science', unlocked: true },
      shamanism: { title: 'Shamanism', unlocked: true },
      shrine: { title: 'Shrine', unlocked: true },
      venture: { title: 'Venture', unlocked: true }
    }
  },

  getters: {
    fps(state) {
      return state.fps
    },

    gameState(state) {
      return state.gameState
    },

    ticksPlayed(state) {
      return state.gameState.ticksPlayed
    },

    plotPoint(state) {
      return state.gameState.plotPoint
    },

    disableControls(state) {
      return state.gameState.disableControls
    },

    logs(state) {
      return state.gameState.logs
    },

    tabs(state) {
      return state.tabs
    },

    getSaveData(state, rootState) {
      return {
        gameState: rootState.gameState,

        resources: rootState.resources,
        actions: rootState.actions,
        tasks: rootState.tasks,
        activeTask: rootState.activeTask,
        upgrades: rootState.upgrades,
        buildings: rootState.buildings,
        stats: rootState.stats
      }
    }
  },

  mutations: {
    remember_gameState(state, payload) {
      state.gameState = payload
    },

    incrementTick(state) {
      state.gameState.ticksPlayed++
    },

    incrementPlotPoint(state) {
      state.plotPoint++
    },

    disableControls(state) {
      state.gameState.disableControls = true
    },

    enableControls(state) {
      state.gameState.disableControls = false
    },

    pushLog(state, text) {
      state.gameState.logs.unshift({ text: text })
    },

    unlock_tabs(state, unlock) {
      state.tabs[unlock.link].unlocked = true
    }
  },

  actions: {
    // Main updater event that fires every frame
    updateStuff({ state, commit, dispatch, rootGetters }) {
      // Update resources that have rate
      // ToDo: rework rates
      dispatch('updateResourcesWithRate')

      // Refill bars
      dispatch('refillBars')

      // Commit active task
      if (rootGetters.activeTask) dispatch('runActiveTask', rootGetters.activeTask)

      // Run active research
      if (rootGetters.researchActive) dispatch('runActiveResearch')

      // Check for unlocks
      if (state.gameState.ticksPlayed % state.fps === 0) dispatch('checkForUnlocks')

      // Timekeeping
      commit('incrementTick')
    },

    checkForUnlocks({ state, commit, dispatch, rootGetters }) {
      const categories = ['tasks', 'upgrades', 'research']

      for (let category of categories) {
        for (let item of Object.values(rootGetters[category])) {
          if (
            !item.unlocked &&
            item.trigger &&
            // Resource trigger
            ((item.trigger.resource && rootGetters.resources[item.trigger.resource].countRound >= item.trigger.amount) ||
              // Skill level trigger
              (item.trigger.skill && rootGetters.skills[item.trigger.skill].level >= item.trigger.level))
          ) {
            commit('unlock_' + category, { link: item.link })
            dispatch('pushLogs', { category: category, link: item.link, type: 'unlock' })
          }
        }
      }

      // Check for resource unlocks
      for (let item in rootGetters.resources) {
        if (!rootGetters.resources[item].unlocked && rootGetters.resources[item].count) commit('unlock_resources', { link: item })
      }
    },

    advancePlot({ commit }) {
      commit('disableControls')
      commit('incrementPlotPoint')
      commit('enableControls')
    },

    pushLogs({ state, commit, rootGetters }, item) {
      // item: { category: String, link: String, type: String }
      const text = rootGetters[item.category][item.link][item.type + 'Message']
      commit('pushLog', text)
    },

    applyCosts({ state, commit, rootGetters }, event) {
      // event = { category: String, link: String }
      for (let i = 0; i < rootGetters[event.category][event.link].cost.length; i++) {
        let cost = rootGetters[event.category][event.link].cost[i]
        // 1. Resource costs
        if (cost.resource) commit('addResource', { resource: cost.resource, amount: 0 - cost.amount / state.fps })
        // 2. Bars deplete
        else if (cost.bars) commit('addBar', { link: cost.bars, amount: 0 - cost.amount / state.fps })
        // Other variants go here
        else commit('pushLog', '🔔🔔🔔 No handler for cost type provided in applyCosts() 🔔🔔🔔')
      }
    },

    applyCostsOnce({ state, commit, rootGetters }, event) {
      // event = { category: String, link: String, tier: Number }
      let costsList = rootGetters[event.category][event.link].cost

      if (event.tier) costsList = rootGetters[event.category][event.link].tiers[event.tier].cost

      for (let i = 0; i < costsList.length; i++) {
        let cost = costsList[i]
        // 1. Resource costs
        if (cost.resource) commit('addResource', { resource: cost.resource, amount: 0 - cost.amount })
        // 2. Bars deplete
        else if (cost.bars) commit('addBar', { link: cost.bars, amount: 0 - cost.amount })
        else commit('pushLog', '🔔🔔🔔 No handler for cost type provided in applyCosts() 🔔🔔🔔')
        // ToDo: cost types: motivation/flux
      }
    },

    applyEffects({ state, commit, dispatch, rootGetters }, event) {
      // event = { category: String, link: String }
      for (let i = 0; i < rootGetters[event.category][event.link].effect.length; i++) {
        let effect = rootGetters[event.category][event.link].effect[i]
        // Apply effect based on effect type
        // 1. Resource effects
        if (effect.resource) commit('addResource', { resource: effect.resource, amount: effect.amount / state.fps })
        // 2. Bars refill
        else if (effect.bars) commit('addBar', { link: effect.bars, amount: effect.amount / state.fps })
        // Other variants go here
        else commit('pushLog', '🔔🔔🔔 No handler for effect type provided in applyEffects() 🔔🔔🔔')
      }
    },

    applyEffectsOnce({ state, commit, dispatch, rootGetters }, event) {
      // event: { category: String, link: String }
      // buildings: { category: String, link: String, tier: Number }
      let effectsList = rootGetters[event.category][event.link].effect

      if (event.tier) effectsList = rootGetters[event.category][event.link].tiers[event.tier].effect

      for (const effect of effectsList) {
        // Apply effect based on effect type
        // 1. Unlocks
        if (effect.unlock) {
          commit('unlock_' + effect.category, { link: effect.link, tier: effect.tier ? effect.tier : null }) // unlock target

          // 2. Resource effects
        } else if (effect.resource) {
          commit('addResource', { resource: effect.resource, amount: effect.amount })

          // 3. Progress effects
        } else if (effect.progress) {
          dispatch('applyProgress', effect)

          // 4. Multiply or add
        } else if (effect.multiply || effect.add) {
          dispatch('mathTargetAttribute', {
            type: effect.multiply ? 'multiply' : 'add',
            category: effect.category,
            link: effect.link,
            target: effect.target,
            subtarget: effect.subtarget,
            amount: effect.amount
          })
          // 5. Bars refill
        } else if (effect.bars) {
          commit('addBar', { link: effect.bars, amount: effect.amount })
          // 0. Other
        } else commit('pushLog', '🔔🔔🔔 applyEffectsOnce: unknown effect type! 🔔🔔🔔')
      }
    },

    applyProgress({ state, dispatch }, effect) {
      if (effect.stats) dispatch('progress_stats', { link: effect.stats, amount: effect.progress })
      else if (effect.skills) dispatch('progress_skills', { link: effect.skills, amount: effect.progress })
    },

    // Sums up all rate sources for every resource that has applicable rate, then rewrites rate value
    recalculateRates({ state, rootGetters, commit }) {
      // Items that have rates
      const haveRates = ['resources', 'bars']

      for (let item of haveRates) {
        for (let resource in rootGetters[item]) {
          let baseRate = rootGetters[item][resource].baseRate
          let previousRate = rootGetters[item][resource].rate
          let resultRate = baseRate

          // Poll Rate Sources
          const rateSources = ['buildings', 'skills']

          for (let sourceCategory of rateSources) {
            for (let source in rootGetters[sourceCategory]) {
              let sourceItem = rootGetters[sourceCategory][source]
              let providesList = []
              // Get 'provides list' based on source having tiers
              // Level 0 means that source is not polled
              if (sourceItem.tiers && sourceItem.level && sourceItem.tiers[sourceItem.level].provides)
                providesList = sourceItem.tiers[sourceItem.level].provides
              else if (sourceItem.level && sourceItem.provides) providesList = sourceItem.provides

              // Iterate list of provides for target resource rate
              for (let providesItem of providesList) {
                if (providesItem.link === resource && providesItem.target === 'rate') {
                  if (providesItem.add) resultRate = resultRate + providesItem.amount
                  else if (providesItem.multiply) resultRate = resultRate * providesItem.amount
                }
              }
            }
          }

          resultRate = Number(Math.round(resultRate + 'e2') + 'e-2')

          if (resultRate !== previousRate) {
            console.log('Rate update: ' + resource + ' -> ' + resultRate)
            commit('modify_' + item, { link: resource, attrType: 'rate', amount: resultRate })
          }
        }
      }
    },

    // Calculate new attribute value and commit mutations
    mathTargetAttribute({ state, commit, rootGetters }, item) {
      let targetAmount = null
      let resultAmount = null
      let attrIndex = null

      // Get target value
      if (item.subtarget) {
        let target = rootGetters[item.category][item.link][item.target] // e.g. tasks.shovelBatshit.effect
        attrIndex = target.findIndex((subtarget) => subtarget.resource === item.subtarget) // e.g. subtarget: 'batshit'
        targetAmount = target[attrIndex].amount
      } else {
        targetAmount = rootGetters[item.category][item.link][item.target] // e.g. resources.shrooms.cap
      }
      // Get final number
      if (item.type === 'multiply') resultAmount = targetAmount * item.amount
      else if (item.type === 'add') resultAmount = targetAmount + item.amount

      commit('modify_' + item.category, {
        link: item.link,
        attrType: item.target,
        attrIndex: attrIndex,
        amount: Number(Math.round(resultAmount + 'e2') + 'e-2')
      })
    },

    loadSave({ state, commit }, saveData) {
      const thingsToRemember = ['gameState', 'resources', 'actions', 'tasks', 'upgrades', 'stats', 'buildings']
      // Remember stuff from the list above
      thingsToRemember.forEach((i) => commit('remember_' + i, saveData[i]))
      // Remember specific things
      commit('toggleTask', saveData.activeTask)
    }
  }
}
