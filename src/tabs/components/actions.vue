<template lang="pug">

.actions
  .section-title Actions

  v-tooltip(
    v-for="(action, key) in actions"
    :key="'action_' + key"
    content-class="button-tooltip"
    right
  )
    template(#activator="tooltip")
      span(v-on="tooltip.on")
        v-btn.action-button(
          @click="runAction(action.link)"
          :disabled="actionCheckDisabled(action.link)"
          color="#ECEFF1"
          retain-focus-on-click
          outlined
          small
        ) {{ action.title }}

    tooltip(
      :title="action.title"
      :text="action.tooltipText"
      :effect="action.effect"
      :cost="action.cost ? action.cost : null"
      :flavor="action.tooltipFlavor ? action.tooltipFlavor : null"
    )

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default Vue.component('actions', {
  name: 'actions',

  computed: {
    ...mapGetters(['resources', 'actions'])
  },

  methods: {
    ...mapActions(['runAction']),

    actionCheckDisabled(link) {
      if (this.actions[link].cost) {
        for (let i = 0; i < this.actions[link].cost.length; i++) {
          let price = this.actions[link].cost[i]
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
