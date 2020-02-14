<template lang="pug">

.caveorama
  | Cave-o-Rama. Plot Point: {{ plotPoint }}

</template>

<script>
import { mapGetters } from 'vuex'

export default Vue.component('caveorama', {
  name: 'caveorama',

  computed: {
    ...mapGetters(['plotPoint'])
  }
})
</script>

<style lang="sass">
$border-color: #455A64
$cave-height: 240px

.caveorama
  width: 1200px
  height: $cave-height
  line-height: $cave-height
  text-align: center

  background: #090b0d url('~@/assets/the-cave.png') no-repeat 0 0 / 100% 100%
</style>
