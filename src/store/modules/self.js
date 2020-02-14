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
        progress: 130,
        progressRate: 1,
        levelupMessage: 'You feel <b class="highlight">stronger</b>.'
      },
      smoothness: {
        title: 'Smoothness',
        description: 'Affects combat, labor effectiveness.',
        level: 2,
        cap: 7,
        progress: 24,
        progressRate: 1,
        levelupMessage: 'You feel <b class="highlight">quicker</b>.'
      },
      vigor: {
        title: 'Vigor',
        description: 'Affects motivation.',
        level: 1,
        cap: 4,
        progress: 30,
        progressRate: 1,
        levelupMessage: 'You feel <b class="highlight">sturdier</b>.'
      },
      smarts: {
        title: 'Smarts',
        description: 'Affects shamanism, research, flux.',
        level: 2,
        cap: 5,
        progress: 10,
        progressRate: 1,
        levelupMessage: 'You feel <b class="highlight">smarter</b>.'
      },
      shrewdness: {
        title: 'Shrewdness',
        description: 'Affects social, shamanism, flux.',
        level: 1,
        cap: 5,
        progress: 0,
        progressRate: 1,
        levelupMessage: 'You feel <b class="highlight">wiser</b>.'
      },
      charm: {
        title: 'Charm',
        description: 'Affects social.',
        level: 2,
        cap: 4,
        progress: 0,
        progressRate: 1,
        levelupMessage: 'You feel <b class="highlight">pretty, oh so pretty</b>.'
      }
    },

    bars: {
      motivation: {
        title: 'Motivation',
        link: 'motivation',
        value: 2,
        cap: 15,
        rate: 0.5,
        tooltipFlavor: 'Your eagerness to do anything.'
      },
      flux: {
        title: 'Flux',
        link: 'flux',
        value: 2,
        cap: 15,
        rate: 0.2,
        tooltipFlavor: 'Your spiritual reserves.'
      }
    }
  },

  getters: {
    self(state) {
      return state
    },

    stats(state) {
      return state.stats
    },

    bars(state) {
      return state.bars
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
    },

    bar_value(state, item) {
      state.bars[item.link].value = item.value
    }
  },

  actions: {
    progress_stats({ state, commit, dispatch, getters }, progress) {
      // progress: {
      //   link: String,
      //   amount: 1
      // }
      const stat = state.stats[progress.link]
      // If stat and progress is maxed out -> Do nothing
      if (stat.level === stat.cap && stat.progress === getters.statsProgressNeeded(progress.link)) return

      let progressNew = Number(Math.round(stat.progress + progress.amount * stat.progressRate + 'e0') + 'e-0')

      // Check if progress is above needed progress
      if (progressNew >= getters.statsProgressNeeded(progress.link)) {
        // Set new progress value to max needed
        progressNew = getters.statsProgressNeeded(progress.link)
        // Check if stat is at max
        if (stat.level != stat.cap) {
          // 1. up stat one level
          commit('modify_stats', { link: progress.link, attrType: 'level', amount: stat.level + 1 })
          dispatch('pushLogs', { category: 'stats', link: progress.link, type: 'levelup' })
          // 2. and set progress to 0
          commit('modify_stats', { link: progress.link, attrType: 'progress', amount: 0 })
          return
        } else {
          // If stat is at cap, just keep progress at max
          commit('modify_stats', { link: progress.link, attrType: 'progress', amount: progressNew })
          return
        }
      }

      commit('modify_stats', { link: progress.link, attrType: 'progress', amount: progressNew })
    },

    refillBars({ state, commit, rootGetters }) {
      for (let item in state.bars) {
        const bar = state.bars[item]

        if (bar.value != bar.cap) {
          let newValue = bar.value + bar.rate / rootGetters.fps

          if (newValue >= bar.cap) newValue = bar.cap
          if (newValue <= 0) newValue = 0

          commit('bar_value', { link: bar.link, value: Number(Math.round(newValue + 'e1') + 'e-1') })
        }
      }
    }
  }
}
