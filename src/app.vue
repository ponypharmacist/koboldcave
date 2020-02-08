<template lang="pug">

v-app
  .loader(v-if="isLoading" @click="isLoading = !isLoading") Is loading...

  .app-content(v-if="!isLoading")
    caveorama

    .interface(v-show="plotPoint >= 3")
      resources

      .main
        navigation

        router-view

      logs(v-show="plotPoint >= 4")

  plot-modals

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { readLocalStorage, updateLocalStorage, clearLocalStorage } from './plugins/helpers'
import MainLoop from './plugins/mainloop'

export default {
  data: () => {
    return {
      isLoading: true
    }
  },

  mounted() {
    // Uncomment this if you need to reset save
    clearLocalStorage('koboldCave')

    // On Launch
    // 1. Read local storage
    let saveData = readLocalStorage('koboldCave')

    // 2. If save exists, load saveData
    if (saveData) this.loadSave(saveData)

    // 3. Or start a new cave
    if (!saveData) this.newGame()

    // 4. Set first tab as active
    if (this.$route.name != 'shenanigans') this.$router.replace({ name: 'shenanigans' })

    // 5. Hide the loader
    this.isLoading = false

    // Finally. Start the main loop
    MainLoop.setUpdate(this.updateStuff)
      .setSimulationTimestep(500)
      .setEnd(this.endLoop)
      .start()
  },

  computed: {
    ...mapGetters(['plotPoint', 'resources', 'tasks', 'activeTask', 'upgrades'])
  },

  methods: {
    ...mapActions(['updateStuff', 'loadSave', 'advancePlot']),

    endLoop(fps, panic) {
      if (panic) {
        let discardedTime = Math.round(MainLoop.resetFrameDelta())
        console.warn(
          'Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime / 60000 + ' minutes'
        )
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
    },

    newGame() {
      this.advancePlot()
    }
  }
}
</script>

<style lang="sass">
$border-color: #455A64
$cave-height: 240px

.loader
  text-align: center
  margin: auto

.app-content
  margin: 1rem auto
  font-size: 14px

.interface
  display: flex
  justify-items: stretch

.main
  width: 800px
</style>
