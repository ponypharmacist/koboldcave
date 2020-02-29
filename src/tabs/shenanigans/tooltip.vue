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
      ) {{ costText(item) }}

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
      else if (this.type === 'indefinite') return 'per second'
      else return ''
    }
  },

  methods: {
    effectText(item) {
      if (item.resource) return '+' + item.amount + ' ' + item.resource + ' ' + this.effectPostfix
      if (item.unlock || item.multiply || item.add) return item.title
      if (item.progress && item.stats) return '+' + item.progress + ' ' + item.stats + ' progress ' + this.effectPostfix
      if (item.progress && item.skills) return '+' + item.progress + ' ' + item.skills + ' progress ' + this.effectPostfix
      if (item.bars) return '+' + item.amount + ' ' + item.bars + ' ' + this.effectPostfix
    },

    costText(item) {
      if (item.resource) return item.resource + ' ' + item.amount + ' ' + this.effectPostfix
      if (item.bars) return item.amount + ' ' + item.bars + ' ' + this.effectPostfix
    }
  }
})
</script>
