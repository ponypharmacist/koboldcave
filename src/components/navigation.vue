<template lang="pug">

.navigation-tabs
  .tab(
    v-for="(item, key) in tabs"
    :key="'tab_' + item.name"
    @click="switchTab(item.name)"
    :class="{ current: tab === item.name }"
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
    switchTab(name) {
      if (this.tab !== name) {
        this.tab = name
        this.$router.push({ name: name })
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
    border-radius: 5px
    cursor: pointer
    transition: $transition-all

    &:hover
      background-color: rgb(255, 224, 130, 0.1)

    &.current
      font-weight: bold
      color: rgb(255, 224, 130)
</style>
