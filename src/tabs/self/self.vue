<template lang="pug">

.self
  .about
    p 
      b Name: 
      | Shamson the kob 
      v-icon(color="#ffe082" size="16px") mdi-pencil-outline
      br

      b Level: 
      | 1
      br
 
      b Rank: 
      | Homeless kobold pup

  .stats
    .stat(v-for="(stat, key) in stats" :key="`stat-${stat.title}`") 
      .stat-title {{ stat.title }}
      b.stat-level {{ stat.level }}
        span.stat-cap / {{ stat.cap }}

      v-tooltip(top transition="fade-transition")
        template(#activator="tooltip")
          .stat-progress(v-on="tooltip.on")
            .stat-progress-bar
              .stat-progress-fill(:style="'width: ' + progressFill(stat.progress, key) + '%'")

        div.text-center
          .tooltip-text Progress to 
            b.highlight lvl.{{ stat.level < stat.cap ? stat.level + 1 : stat.level }}:
          .tooltip-text {{ stat.progress }} of {{ statsProgressNeeded(key) }}
          .tooltip-flavor {{ stat.description }}

  .misc-stats
    p Cave respect: 0
    p Stats affect: some tasks/actions in some tabs. Adventure, settlement, trade prices, waifus.

  // Inventory
  inventory

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'self',

  computed: {
    ...mapGetters(['stats', 'statsProgressNeeded'])
  },

  methods: {
    progressFill(progress, link) {
      let needed = this.statsProgressNeeded(link)
      return Number(Math.round((progress / needed) * 100 + 'e0') + 'e0')
    }
  }
}
</script>

<style lang="sass">
.self
  padding: 8px 6px

  .stats
    margin-bottom: 16px

  .stat
    display: flex
    align-items: center

  .stat-title
    display: inline-block
    width: 100px

  .stat-level
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

  .stat-progress-fill
    width: 10%
    height: 3px
    background-color: rgba(255, 224, 130, 0.8)
    border-radius: 1.5px
</style>
