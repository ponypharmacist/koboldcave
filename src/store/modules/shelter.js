/* eslint-disable no-unused-vars */
export default {
  state: {
    buildings: {
      dwelling: {
        link: 'dwelling',
        level: 0,
        unlocked: true,
        blocked: false,
        tiers: [
          /* 0 */ {},
          /* 1 */ {
            title: 'Tent',
            description: 'Primitive tent made out of shroom wood and bat skins.',
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
            provides: [
              {
                type: 'rate',
                category: 'bars',
                link: 'motivation',
                subtarget: null,
                amount: 0.1
              }
            ],
            tooltipFlavor: '20000 steps journey starts with 10000 steps.'
          },
          /* 2 */ {
            title: 'Shack',
            description: 'Stone and wood shack that offers more space and protection.',
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
        blocked: false,
        tiers: [
          /* 0 */ {},
          /* 1 */ {
            title: 'Tinkering Nook',
            description: 'Bla bla bla.',
            cost: [
              { resource: 'skins', amount: 1 },
              { resource: 'shroomwood', amount: 1 }
            ], // 4 skins, 6 shroomwood
            effect: [] // motivation +1, +0.1/s & some resources cap +10
          },
          /* 2 */ {
            title: 'Workshop',
            description: 'Kobold garage of mechanical wonders.',
            cost: [
              { resource: 'skins', amount: 2 },
              { resource: 'shroomwood', amount: 2 }
            ],
            effect: []
          },
          /* 3 */ {
            title: 'Das Craften Laboratorium',
            description: 'Lo and behold.',
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
    upgradeBuilding({ state, commit }, building) {
      // building: { link: String, level: Number }
      // ToDo: apply costs
      // ToDo: apply effects

      // Level Up
      commit('modify_buildings', { link: building.link, attrType: 'level', amount: building.level + 1 })
    }
  }
}
