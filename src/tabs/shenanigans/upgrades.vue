<template lang="pug">

.upgrades
  v-tooltip(
    v-for="upgrade in upgradesUnlocked"
    :key="`upgrade-${upgrade.link}`"
    right
  )
    template(#activator="tooltip")
      span(v-on="tooltip.on")
        v-btn.upgrade-button(
          @click="runUpgrade(upgrade.link)"
          :disabled="upgradeCheckDisabled(upgrade.link)"
          color="#a7e9af"
          retain-focus-on-click
          outlined
          small
        ) {{ upgrade.title }}

    tooltip(
      :title="upgrade.title"
      :text="upgrade.tooltipText"

      :cost="upgrade.cost ? upgrade.cost : null"
      :effect="upgrade.effect ? upgrade.effect : null"
      :flavor="upgrade.tooltipFlavor ? upgrade.tooltipFlavor : null"
    )

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default Vue.component('upgrades', {
  name: 'upgrades',

  computed: {
    ...mapGetters(['resources', 'upgrades', 'upgradesUnlocked'])
  },

  methods: {
    ...mapActions(['runUpgrade']),

    upgradeCheckDisabled(link) {
      if (this.upgrades[link].cost) {
        for (let i = 0; i < this.upgrades[link].cost.length; i++) {
          let price = this.upgrades[link].cost[i]
          if (this.resources[price.resource].countRound < price.amount) {
            return true
          }
        }
      }
      return false
    }
  }
})
</script>

<style lang="sass">
.upgrades
  display: flex
  flex-wrap: wrap
  justify-content: flex-start
  align-items: center
  margin-bottom: 6px
</style>
