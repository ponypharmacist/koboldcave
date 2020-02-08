<template lang="pug">

.resources  
  v-tooltip(
    v-for="(res, key) in resources"
    :key="`tab-${key}`"
    content-class="button-tooltip"
    right
  )
    template(#activator="tooltip")
      .resource(
        v-show="res.unlocked"
        v-on="tooltip.on"
      )
        img.resource-image(
          :src="resourceImage(key)"
          width="12px"
          height="12px"
        )
        .resource-title {{ res.title }}
        .resource-amount
          span.amount-current {{ res.count }} 
          // span.amount-current / {{ res.countRound }} 
          span.amount-max /{{ res.cap }}

    div
      .tooltip-title {{ res.tooltipTitle ? res.tooltipTitle : res.title }}
      .tooltip-text(v-if="res.rate")
        .effect {{ res.rate }}/s


</template>

<script>
import { mapGetters } from 'vuex'

export default Vue.component('resources', {
  name: 'resources',

  computed: {
    ...mapGetters(['resources'])
  },

  methods: {
    resourceImage(name) {
      return require('@/assets/resources/' + name + '.png')
    }
  }
})
</script>

<style lang="sass">
.resources
  min-width: 200px
  padding: 45px 8px 4px

.resource
  display: flex
  align-items: center

.resource-amount
  margin-left: auto

  .amount-max
    color: #554a60
    padding-left: 1px

.resource-image
  position: relative
  width: 12px
  height: 12px
  margin-right: 6px
</style>
