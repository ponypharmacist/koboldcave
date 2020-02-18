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
        progress: 90,
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
    }
  },

  actions: {}
}
