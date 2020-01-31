<template lang="pug">

.tooltip-general
  .tooltip-title {{ title }}

  .tooltip-text {{ text }}

  .tooltip-text(v-if="effect") Effect: 
    .effect(
      v-for="(resource, key) in effect"
      :key="'tooltip_effect_' + key"
      ) {{ resource.resource }} +{{ resource.amount }}{{ effectPostfix }}

  .tooltip-text(v-if="cost") Cost: 
    .cost(
      v-for="(resource, key) in cost"
      :key="'tooltip_cost_' + key"
      ) {{ resource.resource }} -{{ resource.amount }}{{ effectPostfix }}

  .tooltip-flavor(v-if="flavor") {{ flavor }}

</template>

<script>
export default Vue.component('tooltip', {
  name: 'tooltip',

  props: {
    title: {
      type: String,
      default: '[missingTitle]'
    },
    text: {
      type: String,
      default: '[missingText]'
    },
    type: {
      type: String,
      default: 'default'
    },
    effect: {
      type: Array
    },
    cost: {
      type: Array
    },
    flavor: {
      type: String,
      default: null
    }
  },

  computed: {
    effectPostfix() {
      if (this.type === 'production') return '/s'
      if (this.type === 'task') return '/s'
      return ''
    }
  }
})
</script>

<style lang="sass">
.tooltip-title
  font-weight: 700

.tooltip-text
  line-height: 100%
  padding: 4px 0

  .effect
    color: #FFE082

  .cost
    color: #F8BBD0

.tooltip-flavor
  font-style: italic
  opacity: 0.5
</style>
