/* eslint-disable no-unused-vars */
export default {
  state: {
    research: {
      toolmaking: {
        title: 'Tool Making',
        link: 'toolmaking',
        active: false,
        unlocked: true,
        bought: false,
        trigger: { resource: 'stones', amount: 20 },
        cost: [
          { resource: 'shrooms', amount: 10, progress: 0 },
          { resource: 'skins', amount: 10, progress: 0 },
          { resource: 'stones', amount: 10, progress: 0 }
        ],
        effect: [],
        tooltipText: 'Much more handier than hands.',
        unlockMessage: 'You come up with a better design for your shovel.',
        boughtMessage: 'Now your can shovel more effectively.'
      },

      wheel: {
        title: 'Wheel',
        link: 'wheel',
        active: false,
        unlocked: true,
        bought: false,
        trigger: { resource: 'stones', amount: 20 },
        cost: [{ resource: 'shrooms', amount: 100, progress: 0 }],
        effect: [],
        tooltipText: 'Stone wheel. Fascinating.',
        unlockMessage: 'You come up with a better design for your shovel.',
        boughtMessage: 'Now your can shovel more effectively.'
      }
    }
  },

  getters: {
    research(state) {
      return state.research
    },

    researchUnlocked(state) {
      return Object.values(state.research).filter((tech) => tech.unlocked && !tech.bought)
    },

    researchActive(state) {
      return Object.values(state.research).find((tech) => tech.active)
    }
  },

  mutations: {
    research(state, payload) {
      state.research = payload
    },

    unlock_research(state, unlock) {
      state.research[unlock.link].unlocked = true
    },

    stop_research(state, link) {
      state.research[link].active = false
    },

    start_research(state, link) {
      state.research[link].active = true
    },

    block_research(state, link) {
      state.research[link].bought = true
    },

    researchCostProgress(state, tech) {
      // tech: { link: tech.link, resource: cost.resource, amount: rate }
      const research = state.research[tech.link]

      let index = research.cost.findIndex((x) => x.resource === tech.resource)
      research.cost[index].progress += tech.amount
    }
  },

  actions: {
    startResearch({ state, getters, commit }, link) {
      if (getters.researchActive && getters.researchActive.link === link) {
        commit('stop_research', getters.researchActive.link)
        return
      } else if (getters.researchActive) {
        commit('stop_research', getters.researchActive.link)
      }
      commit('start_research', link)
    },

    runActiveResearch({ state, getters, rootGetters, commit, dispatch }) {
      const tech = getters['researchActive']
      const rate = 1 // per turn
      const costsCount = tech.cost.length
      let costsFilled = 0

      for (const cost of tech.cost) {
        // Check if bar is filled and research cost can be paid
        if (cost.progress < cost.amount && rootGetters.resources[cost.resource].countRound >= rate) {
          commit('addResource', { resource: cost.resource, amount: 0 - rate })
          commit('researchCostProgress', { link: tech.link, resource: cost.resource, amount: rate })
        } else if (cost.progress === cost.amount) {
          costsFilled++
        }
      }
      // Check if research is complete
      if (costsFilled === costsCount) dispatch('finishResearch', tech.link)
    },

    finishResearch({ state, commit, dispatch }, link) {
      dispatch('applyEffectsOnce', { category: 'research', link: link })
      commit('stop_research', link)
      commit('block_research', link)
      commit('pushLog', '<b class="highlight">' + state.research[link].title + '</b> research complete.')
    }
  }
}
