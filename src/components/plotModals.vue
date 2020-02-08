<template lang="pug">

.plot-modals
  // 1. Welcome
  v-dialog(
    :value="plotPoint === 1"
    width="400"
    dark persistent
  )
    .text-center
      v-card
        v-card-text You are a tiny kobold in a vast cave.
        v-card-actions
          v-btn(
            depressed small
            :disabled="disableControls"
            @click="advancePlot"
          ) Oh...

  // 2. Welcome
  v-dialog(
    :value="plotPoint === 2"
    width="400"
    dark persistent
  )
    .text-center
      v-card
        v-card-text
          | Perhaps, a wanderer, a lost soul? 
          br
          | Of course only you would know better. 
          br
          br
          | Tired and hungry, you deem this place 
          br
          | worthy for a camp.
        v-card-actions
          v-btn(
            depressed small
            :disabled="disableControls"
            @click="advancePlot"
          ) Right!

  // 4. iStone
  v-dialog(
    :value="plotPoint === 4"
    width="400"
    dark persistent
  )
    .text-center
      v-card
        v-card-text
          | While setting up camp you find a fancy shiny stone. It talks to you in symbols that you understand.
        v-card-actions
          v-btn(
            depressed small
            :disabled="disableControls"
            @click="advancePlot"
          ) Shiny!

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default Vue.component('plot-modals', {
  name: 'plot-modals',

  computed: {
    ...mapGetters(['plotPoint', 'disableControls'])
  },

  methods: {
    ...mapActions(['advancePlot'])
  }
})
</script>

<style lang="sass">
.plot-modals
  position: relative
</style>
