<template lang="pug">

.self-bars
  div(
    v-for="bar in bars"
    :key="`bar-${bar.link}`"
    :class="bar.link"
  )
    v-tooltip(content-class="button-tooltip" top transition="fade-transition")
      template(#activator="tooltip")
        .self-bar-wrap(v-on="tooltip.on")
          .self-bar
            .self-bar-fill(:style="'width: ' + barFill(bar.value, bar.link) + '%'")

      div.text-center
        .tooltip-text {{ bar.title }}
        .tooltip-text {{ bar.value }} of {{ bar.cap }}
        .tooltip-text
          .highlight {{ barsRate(bar.link) }} per second
        .tooltip-flavor {{ bar.tooltipFlavor }}

</template>

<script>
import { mapGetters } from 'vuex'

export default Vue.component('self-bars', {
  name: 'self-bars',

  computed: {
    ...mapGetters(['bars', 'activeTask', 'tasks'])
  },

  methods: {
    barFill(value, link) {
      let max = this.bars[link].cap
      return Number(Math.round((value / max) * 100 + 'e0') + 'e0')
    },

    barsRate(link) {
      // poll rate providers
      let rate = this.bars[link].rate
      // 1. In current task
      let activeTask = this.tasks[this.activeTask]
      if (activeTask.effect && activeTask.effect.find((eff) => eff.bars === link)) {
        rate = rate + activeTask.effect.find((eff) => eff.bars === link).amount
      }
      if (activeTask.cost && activeTask.cost.find((price) => price.bars === link)) {
        rate = rate - activeTask.cost.find((price) => price.bars === link).amount
      }

      return rate
    }
  }
})
</script>

<style lang="sass">
.self-bars
  display: flex
  flex-direction: column
  width: 100%
  height: 40px
  padding: 4px 4px
  margin-bottom: 8px

    // Stat Progress Bars
  .self-bar-wrap
    align-items: center
    width: 100%
    height: 16px
    padding: 2px 0
    cursor: pointer

  .self-bar
    width: 100%
    height: 12px
    background-color: #554a60
    border-radius: 1px

  .self-bar-fill
    width: 10%
    height: 100%
    border-radius: 1px
    transition: all 0.5s linear !important

.motivation .self-bar-fill
  background-color: #ffe082

.flux .self-bar-fill
  background-color: #CE93D8
</style>
