<template lang="pug">

.resources
  self-bars

  // Resources
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
        :class="key"
      )
        .resource-fill(:style="'width: ' + res.count / res.cap * 100 + '%'")
        img.resource-image(
          :src="resourceImage(key)"
          width="12px"
          height="12px"
        )
        .resource-title {{ res.title }}
        .resource-amount
          span.amount-current {{ res.countRound }} 

    div
      .tooltip-title {{ res.tooltipTitle ? res.tooltipTitle : res.title }}
      .tooltip-text {{ res.count }} / {{ res.cap }}
      .tooltip-text(v-if="res.rate")
        .effect {{ res.rate }}/s
      .tooltip-flavor(v-if="res.tooltipFlavor") {{ res.tooltipFlavor }}

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
  padding: 0px 4px 4px

.resource
  display: flex
  align-items: center
  position: relative

  .resource-fill
    position: absolute
    height: calc(100% - 2px)
    margin-top: 0
    background-color: rgba(255, 224, 130, 0.05)
    border-bottom: 1px solid rgba(255, 224, 130, 0.08)
    border-right: 1px solid rgba(255, 224, 130, 0.08)
    border-radius: 0 4px 4px 0

  &.insight
    margin-top: 12px

    &::before
      position: absolute
      content: ''
      width: 27px
      height: 5px
      top: -8px
      left: 84px
      background: transparent url('~@/assets/resources/divider.png') no-repeat 0 0 / 100% 100%

.resource-amount
  margin-left: auto
  margin-right: 4px

.resource-image
  position: relative
  width: 12px
  height: 12px
  margin-right: 6px
  margin-left: 4px
</style>
