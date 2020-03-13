/* eslint-disable no-unused-vars */
export default {
  state: {
    items: {
      copperRing: {
        title: 'Copper Ring',
        link: 'copperRing',
        type: 'equip',
        price: 100,
        owned: 1
      },
      magicStick: {
        title: 'Magic Stick',
        link: 'magicStick',
        type: 'equip',
        owned: 1
      },
      skillSlate: {
        title: 'Skill Slate',
        link: 'skillSlate',
        type: 'consumable',
        owned: 1
      },
      bookOfMagic: {
        title: 'Book of Magic',
        link: 'bookOfMagic',
        type: 'consumable',
        owned: 1
      },
      normalBoots: {
        title: 'Normal Boots',
        link: 'normalBoots',
        type: 'equip',
        owned: 1
      },
      fancyHat: {
        title: 'Fancy Hat',
        link: 'fancyHat',
        type: 'equip',
        owned: 1
      }
    }
  },

  getters: {
    items(state) {
      return state.items
    },

    itemsOwned(state) {
      return Object.values(state.items).filter((x) => x.owned)
    },

    itemsOwnedByType: (state) => (type) => Object.values(state.items).filter((x) => x.owned && x.type === type)
  },

  mutations: {
    remember_items(state, savedItems) {
      state.items = savedItems
    }
  },

  actions: {}
}
