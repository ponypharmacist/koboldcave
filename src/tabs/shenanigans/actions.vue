<template lang="pug">

.actions
  v-tooltip(
    v-for="action in actionsUnlocked"
    :key="`action-${action.link}`"
    right
  )
    template(#activator="tooltip")
      span(v-on="tooltip.on")
        v-btn.action-button(
          @click="runAction(action.link)"
          :disabled="actionCheckDisabled(action.link)"
          color="#ECEFF1"
          outlined
          small
        ) {{ action.title }}

    tooltip(
      :title="action.title"
      :text="action.tooltipText"
      :effect="action.effect"
      :cost="action.cost || null"
      :flavor="action.tooltipFlavor || null"
    )

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default Vue.component('actions', {
  name: 'actions',

  computed: {
    ...mapGetters(['resources', 'actions', 'actionsUnlocked'])
  },

  methods: {
    ...mapActions(['runAction']),

    actionCheckDisabled(link) {
      const action = this.actions[link]
      // Disabled by not enough resources
      if (action.cost) {
        for (let i = 0; i < action.cost.length; i++) {
          let price = action.cost[i]
          if (this.resources[price.resource].countRound < price.amount) return true
        }
      }
      // Disabled by inability to gain more resource of this type
      if (action.effect) {
        for (let i = 0; i < action.effect.length; i++) {
          let gain = action.effect[i]
          if (gain.resource && this.resources[gain.resource].cap === this.resources[gain.resource].countRound) return true
        }
      }

      return false
    }
  }
})
</script>

<style lang="sass">
.actions
  display: flex
  flex-wrap: wrap
  justify-content: flex-start
  align-items: center
  margin-bottom: 10px
</style>
