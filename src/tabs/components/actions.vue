<template lang="pug">

.actions
  v-tooltip(
    v-for="action in actionsActive"
    :key="`action-${action.link}`"
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
    ...mapGetters(['resources', 'actions', 'actionsActive'])
  },

  methods: {
    ...mapActions(['runAction']),

    actionCheckDisabled(link) {
      console.log('Actions rerender!')
      const action = this.actions[link]
      if (action.cost) {
        for (let i = 0; i < action.cost.length; i++) {
          let price = action.cost[i]
          if (this.resources[price.resource].countRound < price.amount) return true
        }
      }

      return false
    }
  }
})
</script>

<style lang="sass"></style>
