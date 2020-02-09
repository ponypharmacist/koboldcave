<template lang="pug">

.self
  .stats
  .stats
    .stat(v-for="stat in stats" :key="`stat-${stat.title}`") 
      .stat-title {{ stat.title }}
      b.stat-value {{ stat.value }}
        span.stat-cap / {{ stat.cap }}

      v-tooltip(content-class="button-tooltip" top transition="fade-transition")
        template(#activator="tooltip")
          .stat-progress(v-on="tooltip.on")
            .stat-progress-bar
              .stat-progress-value(:style="'width: ' + progressFill(stat.progress, stat.value) + '%'")

        div.text-center
          .tip-text Progress to 
            b.highlight lvl.{{ stat.value }}:
          .tip-value {{ stat.progress }} of {{ progressNeeded(stat.value) }}

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'self',

  computed: {
    ...mapGetters(['stats', 'statsProgressModifier', 'statsProgressBase'])
  },

  methods: {
    progressNeeded(value) {
      return Number(Math.round(this.statsProgressModifier ** value * this.statsProgressBase + 'e0') + 'e0')
    },

    progressFill(progress, value) {
      let needed = this.progressNeeded(value)
      return Number(Math.round((progress / needed) * 100 + 'e0') + 'e0')
    }
  }
}
</script>

<style lang="sass">
.self
  padding: 8px 6px

  .stat
    display: flex
    align-items: center

  .stat-title
    display: inline-block
    width: 100px
    text-align: right

  .stat-value
    margin-left: 12px
    color: rgba(255, 224, 130, 1)

    .stat-cap
      margin-left: 8px
      color: #554a60

  // Stat Progress Bars
  .stat-progress
    display: inline-flex
    align-items: center
    width: 120px
    height: 10px
    margin-left: 20px
    cursor: pointer

  .stat-progress-bar
    width: 100%
    height: 3px
    background-color: #554a60
    border-radius: 1.5px

  .stat-progress-value
    width: 10%
    height: 3px
    background-color: rgba(255, 224, 130, 0.8)
    border-radius: 1.5px
</style>
