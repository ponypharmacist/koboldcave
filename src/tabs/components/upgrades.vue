<template lang="pug">

.upgrades
  v-tooltip(
    v-for="(upgrade, key) in upgrades"
    :key="'upgrade_' + key"
    content-class="button-tooltip"
    right
  )
    template(#activator="tooltip")
      span(v-on="tooltip.on")
        v-btn.upgrade-button(
          v-show="upgrade.available && !upgrade.unlocked"
          @click="runUpgrade(upgrade.targets)"
          :disabled="upgradeCheckDisabled(key)"
          color="#ECEFF1"
          retain-focus-on-click
          outlined
          small
        ) {{ upgrade.title }}

    tooltip(
      :title="upgrade.title"
      :text="upgrade.tooltipText"

      :cost="upgrade.cost ? upgrade.cost : null"
      :flavor="upgrade.tooltipFlavor ? upgrade.tooltipFlavor : null"
    )

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default Vue.component('upgrades', {
  name: 'upgrades',

  computed: {
    ...mapGetters(['resources', 'upgrades'])
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

<style lang="sass"></style>
