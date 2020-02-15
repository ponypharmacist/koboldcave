<template lang="pug">

.caveorama
  | Cave-o-Rama. Plot Point: {{ plotPoint }}
  .item.tent

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
  position: relative
  width: 1200px
  height: $cave-height
  line-height: $cave-height
  text-align: center

  background: #090b0d url('~@/assets/the-cave.png') no-repeat 0 0 / 100% 100%

  .item
    position: absolute
    width: 32px
    height: 32px

  .tent
    top: 136px
    left: 540px
    background: transparent url('~@/assets/buildings/tent.gif') no-repeat 0 0 / 32px 32px
</style>
