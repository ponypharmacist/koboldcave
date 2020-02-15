<template lang="pug">

v-app
  .loader(v-if="isLoading" @click="isLoading = !isLoading") Is loading...

  .app-content(v-if="!isLoading")
    .top-menu
      a.new-game(@click="newGame") new game
      a.save-game(@click="saveGame") save game

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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { readLocalStorage, updateLocalStorage, clearLocalStorage } from './plugins/helpers'
import MainLoop from './plugins/mainloop'

export default {
  data: () => {
    return {
      isLoading: true
    }
  },

  mounted() {
    // 1. Read local storage
    let saveData = readLocalStorage('koboldCave')

    // 2. If save exists, load saveData
    if (saveData) this.loadSave(saveData)

    // 3. Or start a new cave
    if (!saveData) this.advancePlot()

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
    ...mapGetters(['getSaveData', 'plotPoint'])
  },

  methods: {
    ...mapMutations(['pushLog']),
    ...mapActions(['updateStuff', 'loadSave', 'advancePlot']),

    endLoop(fps, panic) {
      if (panic) {
        let discardedTime = Math.round(MainLoop.resetFrameDelta())
        console.warn(
          'Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime / 60000 + ' minutes'
        )
      }
    },

    newGame() {
      this.isLoading = true
      clearLocalStorage('koboldCave')
      document.location.reload(true)
    },

    saveGame() {
      updateLocalStorage(this.getSaveData, 'koboldCave')
      this.pushLog('📀 Game saved 📀')
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
  margin: 0 auto

  .interface
    display: flex
    justify-items: stretch

  .main
    width: 800px

  // Top Menu
  .top-menu
    height: 16px
    line-height: 16px
    margin: 2px 0

    a
      margin-right: 12px
      color: #777
      text-decoration: underline

      &:hover
        color: $highlight-color
</style>
