<template lang="pug">

.logs
  p
    span.font-bold To Do
    br
    | - Autosave, load object on start, then run loop
    br
    | - Unlocks: Contemplate -> insight -> unlock shoveling batshit
    br
    | - tooltip for upgrades, what unlocks (+ multiple unlocks)
    br
    | - Logging

  p
    span.font-bold Ideas
    br
    | - Resources: shards, sharp stones, shinies, insight
    br
    | - Tabs: venture, shelter, brews?, Scholars, shamans

</template>

<script>
export default Vue.component('logs', {
  name: 'logs'
})
</script>

<style lang="sass">
.logs
  min-width: 200px
  max-width: 200px
  padding: 4px 8px
</style>
