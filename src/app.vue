<template lang="pug">

v-app
  .loader(v-if="isLoading" @click="isLoading = !isLoading") Is loading...

  .app-content(v-if="!isLoading")
    .caveorama  Cave-o-Rama
      v-btn.ml-2(@click="saveGame" x-small) Save Game
      v-btn.ml-2(@click="newGame" x-small) Clear Data

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
import { mapGetters, mapActions } from 'vuex'
import { readLocalStorage, updateLocalStorage, clearLocalStorage } from './plugins/helpers'
import MainLoop from './plugins/mainloop'
//import sidebarComponent from './sidebar'

export default {
  components: {
    //sidebarComponent
  },

  data: () => {
    return {
      isLoading: true
    }
  },

  mounted() {
    // Set first tab as active
    if (this.$route.name != 'shenanigans') this.$router.replace({ name: 'shenanigans' })

    // Read local storage
    let saveData = readLocalStorage('koboldCave')

    // Load existing save
    if (saveData) {
      this.loadSave(saveData)
      console.log(saveData)
    }

    // Hide loader
    this.isLoading = false

    // Start the main loop.
    MainLoop.setUpdate(this.updateStuff)
      .setSimulationTimestep(500)
      .setEnd(this.endLoop)
      .start()
  },

  computed: {
    ...mapGetters(['resources', 'tasks', 'activeTask', 'upgrades'])
  },

  methods: {
    ...mapActions(['updateStuff', 'loadSave']),

    endLoop(fps, panic) {
      if (panic) {
        let discardedTime = Math.round(MainLoop.resetFrameDelta())
        console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms')
      }
    },

    saveGame() {
      let saveData = {
        resources: this.resources,
        tasks: this.tasks,
        activeTask: this.activeTask,
        upgrades: this.upgrades
      }
      updateLocalStorage(saveData, 'koboldCave')
      console.log(saveData)
    },
    newGame() {
      clearLocalStorage('koboldCave')
      document.location.reload(true)
    }
  }
}
</script>

<style lang="sass">
$border-color: #455A64
$cave-height: 200px

.loader
  text-align: center
  margin: auto

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
