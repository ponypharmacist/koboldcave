<template lang="pug">

v-tabs.navigation-tabs(
  v-model="tab"
  height="32px"
  background-color="rgba(255,255,255,0)"
  color="#FFF8E1"
  slider-size="1"
  centered
)
  //v-tabs-slider

  v-tab(
    v-for="(item, key) in tabs"
    :to="{ name: item.name }"
    :key="'tab_' + item.name"
    :ripple="false"
    replace
  ) {{ item.title }}

</template>

<script>
export default Vue.component('navigation', {
  name: 'navigation',

  data() {
    return {
      tab: 'shenanigans',
      tabs: [
        { name: 'shenanigans', title: 'Shenanigans' },
        { name: 'shelter', title: 'Shelter' }
      ]
    }
  }
})
</script>

<style lang="sass">
.navigation-tabs
  margin: 0 0

  .v-tab
    padding: 0
    margin: 0 8px
    min-width: auto

.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active),
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon,
.theme--light.v-tabs > .v-tabs-bar .v-tab--disabled
  color: $text-color !important
</style>
