<template lang="pug">

.self
  .stats
  .stats
    .stat(v-for="stat in stats" :key="`stat-${stat.title}`") 
      .stat-title {{ stat.title }} 
      .stat-point(v-for="i in stat.value")
      span.stat-progress  10/1024

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'self',

  computed: {
    ...mapGetters(['stats'])
  }
}
</script>

<style lang="sass">
.self
  padding: 8px 6px

  .stat
    display: flex
    align-items: center

  .stat-title
    display: inline-block
    width: 100px
    padding-right: 8px
    text-align: right

  .stat-point
    display: inline-block
    width: 6px
    height: 10px
    margin-right: 3px
    border: 1px solid rgba(255, 224, 130, 0.5)
    background-color: rgba(255, 224, 130, 0.1)

  .stat-progress
    display: inline-block
    padding-left: 4px
    color: #554a60
</style>
