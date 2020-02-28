/* eslint-disable no-unused-vars */
export default {
  state: {
    skillsProgressModifier: 1.33,
    skillsProgressBase: 100,

    skills: {
      farming: {
        title: 'Farming',
        link: 'farming',
        unlocked: true,
        description: 'Your practical knowledge of growing plants.',
        level: 1,
        cap: 5,
        progress: 130,
        progressRate: 1,
        levelupMessage: '<b class="highlight">Farming</b>.'
        // ToDo: put level in levelup message
      },
      mining: {
        title: 'Mining',
        link: 'mining',
        unlocked: true,
        description: 'Your practical knowledge of picking at rocks.',
        level: 1,
        cap: 5,
        progress: 50,
        progressRate: 1,
        levelupMessage: '<b class="highlight">Mining</b>.'
        // ToDo: put level in levelup message
      },
      discipline: {
        title: 'Discipline',
        link: 'discipline',
        unlocked: true,
        description: 'ToDo: description.',
        level: 1,
        cap: 5,
        progress: 50,
        progressRate: 1,
        levelupMessage: '<b class="highlight">Discipline</b>.',
        provides: [{ add: true, category: 'bars', link: 'flux', target: 'rate', amount: 0.2 }]
        // ToDo: put level in levelup message
      }
    }
  },

  getters: {
    skills(state) {
      return state.skills
    },

    skillsUnlocked(state) {
      return Object.values(state.skills).filter((skill) => skill.unlocked)
    },

    skillsProgressNeeded: (state) => (link) =>
      Number(Math.round(state.skillsProgressModifier ** state.skills[link].level * state.skillsProgressBase + 'e0') + 'e0')
  },

  mutations: {
    remember_skills(state, savedSkills) {
      state.skills = savedSkills
    },

    modify_skills(state, item) {
      // item = {
      // link: String,
      // attrType: String,
      // amount: Number
      // }
      state.skills[item.link][item.attrType] = item.amount
    }
  },

  actions: {
    progress_skills({ state, commit, dispatch, getters }, progress) {
      // progress: { link: String, amount: 1 }
      const skill = state.skills[progress.link]
      // If stat and progress is maxed out -> Do nothing
      if (skill.level === skill.cap && skill.progress === getters.skillsProgressNeeded(progress.link)) return

      let progressNew = Number(Math.round(skill.progress + progress.amount * skill.progressRate + 'e0') + 'e-0')

      // Check if progress is above needed progress
      if (progressNew >= getters.skillsProgressNeeded(progress.link)) {
        // Set new progress value to max needed
        progressNew = getters.skillsProgressNeeded(progress.link)
        // Check if stat is at max
        if (skill.level != skill.cap) {
          // 1. up stat one level
          commit('modify_skills', { link: progress.link, attrType: 'level', amount: skill.level + 1 })
          commit('pushLog', '<b class="highlight">' + skill.title + '</b> skill -> <b class="highlight">lvl.' + skill.level + '</b>')
          dispatch('recalculateRates')
          // ToDo: put level in levelup message

          // 2. and set progress to 0
          commit('modify_skills', { link: progress.link, attrType: 'progress', amount: 0 })
          return
        } else {
          // If stat is at cap, just keep progress at max
          commit('modify_skills', { link: progress.link, attrType: 'progress', amount: progressNew })
          return
        }
      }

      commit('modify_skills', { link: progress.link, attrType: 'progress', amount: progressNew })
    }
  }
}
