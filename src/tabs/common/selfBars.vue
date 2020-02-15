<template lang="pug">

.self-bars
  div(
    v-for="bar in bars"
    :key="`bar-${bar.title}`"
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
          .highlight {{ bar.rate }} per second
        .tooltip-flavor {{ bar.tooltipFlavor }}

</template>

<script>
import { mapGetters } from 'vuex'

export default Vue.component('self-bars', {
  name: 'self-bars',

  computed: {
    ...mapGetters(['bars'])
  },

  methods: {
    barFill(value, link) {
      let max = this.bars[link].cap
      return Number(Math.round((value / max) * 100 + 'e0') + 'e0')
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
    padding: 5px 0
    cursor: pointer

  .self-bar
    width: 100%
    height: 6px
    background-color: #554a60
    border-radius: 3px

  .self-bar-fill
    width: 10%
    height: 6px
    border-radius: 3px
    transition: all 0.5s linear !important

.motivation .self-bar-fill
  background-color: #ffe082

.flux .self-bar-fill
  background-color: #CE93D8
</style>
