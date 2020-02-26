/* eslint-disable no-unused-vars */
export default {
  state: {
    buildings: {
      dwelling: {
        link: 'dwelling',
        level: 0,
        tiers: [
          /* 0 */ {},
          /* 1 */ {
            title: 'Tent',
            description: 'Primitive tent made out of shroom wood and bat skins.',
            unlocked: true,
            image: 'tent',
            cost: [
              { resource: 'skins', amount: 1 },
              { resource: 'shroomwood', amount: 2 }
            ],
            effect: [
              { add: true, category: 'resources', link: 'shrooms', target: 'cap', amount: 10 }
              // subtarget: null
              // title: 'More shroom storage'
            ],
            provides: [{ add: true, category: 'bars', link: 'motivation', target: 'rate', amount: 0.1 }],
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
            effect: [{ add: true, category: 'resources', link: 'shrooms', target: 'cap', amount: 20 }],
            provides: [{ add: true, category: 'bars', link: 'motivation', target: 'rate', amount: 0.2 }]
          },
          /* 3 */ {
            title: 'Villa',
            description: 'Nice underground villa.',
            unlocked: true,
            cost: [
              { resource: 'skins', amount: 3 },
              { resource: 'shroomwood', amount: 4 }
            ],
            effect: [{ add: true, category: 'resources', link: 'shrooms', target: 'cap', amount: 30 }],
            provides: [{ add: true, category: 'bars', link: 'motivation', target: 'rate', amount: 0.3 }]
          }
        ]
      },

      craftstation: {
        link: 'craftstation',
        level: 0,
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
      },

      well: {
        title: 'Water Hole',
        link: 'well',
        description: 'Your source of fresh water.',
        level: 0,
        unlocked: true,
        cost: [{ resource: 'shrooms', amount: 5 }],
        effect: [{ add: true, category: 'resources', link: 'shrooms', target: 'cap', amount: 100 }],
        provides: [{ add: true, category: 'bars', link: 'motivation', target: 'rate', amount: 0.3 }]
      },

      spiderFarm: {
        title: 'Spider Farm',
        link: 'spiderFarm',
        description: 'Your source of living nightmares.',
        level: 0,
        unlocked: true,
        cost: [{ resource: 'shrooms', amount: 5 }],
        effect: [{ add: true, category: 'resources', link: 'spiderstring', target: 'cap', amount: 10 }],
        provides: [{ add: true, category: 'resources', link: 'spiderstring', target: 'rate', amount: 1 }]
      }
    }
  },

  getters: {
    buildings(state) {
      return state.buildings
    },

    buildingsUnlocked(state) {
      let arr = []

      for (const item in state.buildings) {
        let building = state.buildings[item]

        if ((building.tiers && building.tiers[1].unlocked) || (building.unlocked && !building.blocked)) arr.push(building)
      }

      return arr
    }
  },

  mutations: {
    remember_buildings(state, savedBuildings) {
      state.buildings = savedBuildings
    },

    modify_buildings(state, item) {
      // item = {
      // link: String,
      // attrType: String,
      // amount: Number
      // }
      state.buildings[item.link][item.attrType] = item.amount
    },

    unlock_buildings(state, unlock) {
      if (unlock.tier) state.buildings[unlock.link].tiers[unlock.tier].unlocked = true
      else state.buildings[unlock.link].unlocked = true
    }
  },

  actions: {
    upgradeBuilding({ state, commit, dispatch }, building) {
      // building: { link: String, level: Number }
      dispatch('applyCostsOnce', { category: 'buildings', link: building.link, tier: building.level ? building.level : null })

      dispatch('applyEffectsOnce', { category: 'buildings', link: building.link, tier: building.level ? building.level : null })
      // Level Up
      commit('modify_buildings', { link: building.link, attrType: 'level', amount: building.level ? building.level : 1 })

      dispatch('recalculateRates')
    }
  }
}
