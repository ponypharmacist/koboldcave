<template lang="pug">

v-app
  .app-content
    .caveorama  Cave-o-Rama

    .interface
      resources

      .main
        navigation
        //keep-alive ? should i use ?
        router-view

      logs

  // sidebar-component

</template>

<script>
import { mapActions } from 'vuex'
//import { readLocalStorage } from './plugins/helpers'
import MainLoop from './plugins/mainloop'
//import sidebarComponent from './sidebar'

export default {
  components: {
    //sidebarComponent
  },

  mounted() {
    // Read local storage
    // readLocalStorage('coboldCave')
    // https://github.com/ponypharmacist/dnd-charsheet-vue/blob/master/src/components/tavern.vue

    // Set default tab as active
    if (this.$route.name != 'shenanigans') {
      this.$router.replace({ name: 'shenanigans' })
    }

    // Start the main loop.
    MainLoop.setUpdate(this.updateStuff)
      .setSimulationTimestep(500)
      .setEnd(this.endLoop)
      .start()
  },

  methods: {
    ...mapActions(['updateStuff']),

    endLoop(fps, panic) {
      if (panic) {
        let discardedTime = Math.round(MainLoop.resetFrameDelta())
        console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms')
      }
    }
  }
}
</script>

<style lang="sass">
$border-color: #455A64
$cave-height: 200px

.theme--light.v-application
  background-color: $background-color !important
  color: $text-color !important

.app-content
  margin: 1rem auto
  font-size: 14px
  border: 1px solid $border-color

.caveorama
  width: 100%
  height: $cave-height
  line-height: $cave-height
  text-align: center
  border-bottom: 1px solid $border-color

.interface
  display: flex
  min-height: calc(100vh - 200px - 3px - 2rem)
  justify-items: stretch

.main
  width: 800px
  border-left: 1px solid $border-color
  border-right: 1px solid $border-color
</style>
