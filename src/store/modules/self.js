/* eslint-disable no-unused-vars */
export default {
  state: {
    statsProgressModifier: 1.33,
    statsProgressBase: 100,

    rank: 'homeless kobold',

    stats: {
      power: {
        title: 'Power',
        description: 'Affects combat, labor productivity, motivation.',
        level: 1,
        cap: 4,
        progress: 15,
        progressRate: 1
      },
      smoothness: {
        title: 'Smoothness',
        description: 'Affects combat, labor effectiveness.',
        level: 2,
        cap: 7,
        progress: 24,
        progressRate: 1
      },
      vigor: {
        title: 'Vigor',
        description: 'Affects motivation.',
        level: 1,
        cap: 4,
        progress: 30,
        progressRate: 1
      },
      smarts: {
        title: 'Smarts',
        description: 'Affects shamanism, research, flux.',
        level: 2,
        cap: 5,
        progress: 10,
        progressRate: 1
      },
      shrewdness: {
        title: 'Shrewdness',
        description: 'Affects social, shamanism, flux.',
        level: 1,
        cap: 5,
        progress: 0,
        progressRate: 1
      },
      charm: {
        title: 'Charm',
        description: 'Affects social.',
        level: 2,
        cap: 4,
        progress: 0,
        progressRate: 1
      }
    },

    derived: {
      motivation: 10,
      flux: 10
    }
  },

  getters: {
    self(state) {
      return state
    },

    stats(state) {
      return state.stats
    },

    motivation(state) {
      return state.derived.motivation
    },

    flux(state) {
      return state.derived.flux
    },

    statsProgressNeeded: (state) => (link) =>
      Number(Math.round(state.statsProgressModifier ** state.stats[link].level * state.statsProgressBase + 'e0') + 'e0'),

    statsProgressModifier(state) {
      return state.statsProgressModifier
    },

    statsProgressBase(state) {
      return state.statsProgressBase
    }
  },

  mutations: {
    remember_self(state, savedSelf) {
      state = savedSelf
    },

    modify_stats(state, item) {
      // item = {
      // link: String,
      // attrType: String,
      // amount: Number
      // }
      state.stats[item.link][item.attrType] = item.amount
    }
  },

  actions: {
    progress_stats({ state, commit, getters }, progress) {
      // progress: {
      //   link: String,
      //   amount: 1
      // }
      // If stat and progress is maxed out -> Do nothing
      if (stat.level === stat.cap && stat.progress === getters.statsProgressNeeded(progress.link)) return

      const stat = state.stats[progress.link]
      let progressNew = Number(Math.round(stat.progress + progress.amount * stat.progressRate + 'e0') + 'e-0')

      // Check if progress is above needed progress
      if (progressNew >= getters.statsProgressNeeded(progress.link)) {
        // Set new progress value to max needed
        progressNew = getters.statsProgressNeeded(progress.link)
        // Check if stat is at max
        if (stat.level != stat.cap) {
          // A. up stat one level
          commit('modify_stats', { link: progress.link, attrType: 'level', amount: stat.level + 1 })
          // B. and set progress to 0
          commit('modify_stats', { link: progress.link, attrType: 'progress', amount: 0 })
          return
        } else {
          // If stat is at cap, just keep progress at max
          commit('modify_stats', { link: progress.link, attrType: 'progress', amount: progressNew })
          return
        }
      }

      commit('modify_stats', { link: progress.link, attrType: 'progress', amount: progressNew })
    }
  }
}
