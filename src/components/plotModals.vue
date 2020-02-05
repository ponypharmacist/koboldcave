<template lang="pug">

.plot-modals
  // 1. Welcome
  v-dialog(
    :value="plotPoint === 1"
    width="400"
    dark
  )
    .text-center
      v-card
        v-card-text You are a tiny kobold in a vast cave.
        v-card-actions
          v-btn(  
            depressed
            small
            :disabled="disableControls"
            @click="advancePlot"
          ) Oh...

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
