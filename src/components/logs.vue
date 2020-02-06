<template lang="pug">

.logs
  .istone
    .scrollbox
      .message(v-for="(message, key) in logs" :key="'message_' + key") {{ message.text }}
      .message ToDo: Autosave
      .message ToDo: tooltip for upgrades, what unlocks (+ multiple unlocks)

  //p Ideas
    | - Resources: shards, sharp stones, shinies, insight
    | - Tabs: venture, shelter, brews?, Scholars, shamans

</template>

<script>
import { mapGetters } from 'vuex'

export default Vue.component('logs', {
  name: 'logs',

  computed: {
    ...mapGetters(['logs'])
  }
})
</script>

<style lang="sass">
.logs
  position: relative
  min-width: 200px
  max-width: 200px
  padding: 4px 8px

  .istone
    position: absolute
    width: 291px
    height: 578px
    padding: 56px 36px 72px 12px
    background: transparent url('~@/assets/istone.png') no-repeat 0 0 / 100% 100%

    .scrollbox
      display: flex
      flex-direction: column
      align-items: flex-start
      overflow-y: auto
      height: 100%
      background: rgba(255,255,255,0.05)
      border-radius: 10px
      -ms-overflow-style: none

      &::-webkit-scrollbar
        display: none

      .message
        position: relative
        padding: 4px 10px
        margin-bottom: 10px
        font-size: 12px
        background-color: #222
        border-radius: 5px 5px 5px 0

        &::after
          position: absolute
          content: ''
          width: 0
          height: 0
          bottom: -5px
          left: 0
          border-style: solid
          border-width:  5px 5px 0 0
          border-color: #222 transparent transparent transparent
</style>
