<template lang="pug">

.tooltip-general
  .tooltip-title {{ title }}

  .tooltip-text {{ text }}

  .tooltip-text(v-if="effect") Effect: 
    .effect(
      v-for="(item, key) in effect"
      :key="`tooltip-effect-${key}`"
      ) {{ effectText(item) }}

  .tooltip-text(v-if="cost") Cost: 
    .cost(
      v-for="(item, key) in cost"
      :key="`tooltip-cost-${key}`"
      ) {{ item.resource }} {{ item.amount }} {{ effectPostfix }}

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
      if (this.type === 'production') return 'per second'
      if (this.type === 'indefinite') return 'per second'
      return ''
    }
  },

  methods: {
    effectText(item) {
      if (item.resource) return item.resource + ' ' + item.amount + ' ' + this.effectPostfix
      if (item.unlock) return item.title
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
    color: #B39DDB

.tooltip-flavor
  font-style: italic
  opacity: 0.5
</style>
