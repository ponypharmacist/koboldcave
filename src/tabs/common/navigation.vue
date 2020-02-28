<template lang="pug">

.navigation-tabs
  .tab(
    v-for="(item, key) in tabs"
    :key="`tab-${key}`"
    v-show="item.unlocked"
    @click="switchTab(key)"
    :class="{ current: tab === key }"
  ) {{ item.title }}

</template>

<script>
import { mapGetters } from 'vuex'

export default Vue.component('navigation', {
  name: 'navigation',

  data() {
    return {
      tab: 'shenanigans'
    }
  },

  computed: {
    ...mapGetters(['tabs'])
  },

  methods: {
    switchTab(key) {
      if (this.tab !== key) {
        this.tab = key
        this.$router.push({ name: key })
      }
    }
  }
})
</script>

<style lang="sass">
.navigation-tabs
  display: flex
  justify-content: center
  align-items: center
  margin: 0 0
  color: #FFF8E1
  text-align: center

  .tab
    display: inline-block
    font-size: 16px
    padding: 6px 8px
    margin: 0 2px
    border-radius: 5px
    cursor: pointer
    transition: $transition-all

    &:hover
      background-color: rgb(255, 224, 130, 0.05)

    &.current
      //font-weight: bold
      color: rgb(255, 224, 130)
      background-color: rgb(255, 224, 130, 0.05)
</style>
