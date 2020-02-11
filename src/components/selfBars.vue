<template lang="pug">

.self-bars
  .motivation
    v-tooltip(content-class="button-tooltip" top transition="fade-transition")
      template(#activator="tooltip")
        .self-bar-wrap(v-on="tooltip.on")
          .self-bar
            .self-bar-fill(:style="'width: ' + '60' + '%'")

      div.text-center
        .tooltip-text Motivation
        .tooltip-text 10 of 15
        .tooltip-flavor Your eagerness to do anything.

  .flux
    v-tooltip(content-class="button-tooltip" top transition="fade-transition")
      template(#activator="tooltip")
        .self-bar-wrap(v-on="tooltip.on")
          .self-bar
            .self-bar-fill(:style="'width: ' + '40' + '%'")

      div.text-center
        .tooltip-text FLux
        .tooltip-text 10 of 15
        .tooltip-flavor Your spiritual power reserves.

</template>

<script>
import { mapGetters } from 'vuex'

export default Vue.component('self-bars', {
  name: 'self-bars',

  computed: {
    ...mapGetters(['motivation', 'flux'])
  },

  methods: {}
})
</script>

<style lang="sass">
.self-bars
  display: flex
  flex-direction: column
  width: 100%
  height: 40px
  padding: 4px 0
  margin-bottom: 4px

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

.motivation .self-bar-fill
  background-color: #ffe082

.flux .self-bar-fill
  background-color: #CE93D8
</style>
