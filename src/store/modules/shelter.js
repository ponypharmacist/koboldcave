/* eslint-disable no-unused-vars */
export default {
  state: {
    buildings: {
      dwelling: {
        link: 'dwelling',
        level: 0,
        unlocked: true,
        tiers: [
          /* 0 */ {},
          /* 1 */ {
            title: 'Tent',
            description: 'Primitive tent made out of shroom wood and bat skins.',
            unlocked: true,
            cost: [
              { resource: 'skins', amount: 1 },
              { resource: 'shroomwood', amount: 2 }
            ],
            effect: [
              {
                add: true,
                category: 'resources',
                link: 'shrooms',
                target: 'cap',
                subtarget: null,
                amount: 10
                // title: 'More shroom storage'
              }
            ],
            provides: [{ type: 'rate', category: 'bars', link: 'motivation', subtarget: null, amount: 0.1 }],
            tooltipFlavor: '20000 steps journey starts with 10000 steps.'
          },
          /* 2 */ {
            title: 'Shack',
            description: 'Stone and wood shack that offers more space and protection.',
            unlocked: true,
            cost: [
              { resource: 'skins', amount: 2 },
              { resource: 'shroomwood', amount: 3 }
            ],
            effect: [
              {
                add: true,
                category: 'resources',
                link: 'shrooms',
                target: 'cap',
                subtarget: null,
                amount: 20
                // title: 'More shroom storage'
              }
            ],
            provides: [
              {
                type: 'rate',
                category: 'bars',
                link: 'motivation',
                subtarget: null,
                amount: 0.2
              }
            ]
          },
          /* 3 */ {
            title: 'Villa',
            description: 'Nice underground villa.',
            unlocked: true,
            cost: [
              { resource: 'skins', amount: 3 },
              { resource: 'shroomwood', amount: 4 }
            ],
            effect: [
              {
                add: true,
                category: 'resources',
                link: 'shrooms',
                target: 'cap',
                subtarget: null,
                amount: 30
                // title: 'More shroom storage'
              }
            ],
            provides: [
              {
                type: 'rate',
                category: 'bars',
                link: 'motivation',
                subtarget: null,
                amount: 0.3
              }
            ]
          }
        ]
      },

      craftstation: {
        link: 'craftstation',
        level: 1,
        unlocked: true,
        tiers: [
          /* 0 */ {},
          /* 1 */ {
            title: 'Tinkering Nook',
            description: 'Bla bla bla.',
            unlocked: false,
            cost: [
              { resource: 'skins', amount: 1 },
              { resource: 'shroomwood', amount: 1 }
            ],
            effect: []
          },
          /* 2 */ {
            title: 'Workshop',
            description: 'Kobold garage of mechanical wonders.',
            unlocked: false,
            cost: [
              { resource: 'skins', amount: 2 },
              { resource: 'shroomwood', amount: 2 }
            ],
            effect: []
          },
          /* 3 */ {
            title: 'Das Craften Laboratorium',
            description: 'Lo and behold.',
            unlocked: false,
            cost: [
              { resource: 'skins', amount: 3 },
              { resource: 'shroomwood', amount: 3 }
            ],
            effect: []
          }
        ]
      }

      // ToDo: shroomPlots, also upgrades refer here
    }
  },

  getters: {
    shelter(state) {
      return state
    },

    buildings(state) {
      return state.buildings
    },

    buildingsUnlocked(state) {
      let arr = []

      for (const building in state.buildings) {
        if (state.buildings[building].unlocked && !state.buildings[building].blocked) {
          arr.push(state.buildings[building])
        }
      }

      return arr
    }
  },

  mutations: {
    remember_shelter(state, savedShelter) {
      state = savedShelter
    },

    modify_buildings(state, item) {
      // item = {
      // link: String,
      // attrType: String,
      // amount: Number
      // }
      state.buildings[item.link][item.attrType] = item.amount
    }
  },

  actions: {
    upgradeBuilding({ state, commit, dispatch }, building) {
      // building: { link: String, level: Number }
      // ToDo: apply costs
      // ToDo: apply effects
      dispatch('applyEffectsOnce', { category: 'buildings', link: building.link, tier: building.level })

      // Level Up
      commit('modify_buildings', { link: building.link, attrType: 'level', amount: building.level })
    }
  }
}
