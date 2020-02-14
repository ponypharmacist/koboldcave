<template lang="pug">

.logs
  .istone
    .progress-box
      v-progress-linear.current-progress(
        v-if="activeTaskTitle"
        color="rgba(255, 213, 79, 0.25)"
        background-opacity="0.4"
        height="20"
        :value="activeTaskType === 'timed' ? activeTaskProgress : 0"
        reactive
      )
        .current-progress-title
          span {{ activeTaskTitle }}
          span.percent(v-if="activeTaskType === 'timed'") {{ activeTaskProgress ? activeTaskProgress + '%' : '0%' }}

    .scrollbox
      .message(v-for="(message, key) in logs" :key="'message_' + key" v-html="message.text")

</template>

<script>
import { mapGetters } from 'vuex'

export default Vue.component('logs', {
  name: 'logs',

  computed: {
    ...mapGetters(['logs', 'activeTaskTitle', 'activeTaskType', 'activeTaskProgress'])
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
  height: 538px
  padding: 56px 36px 72px 12px
  background: transparent url('~@/assets/istone.png') no-repeat 0 0 / 100% 100%

  .scrollbox
    display: flex
    flex-direction: column
    align-items: flex-start
    overflow-y: auto
    height: calc(100% - 26px)
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

  .progress-box
    width: 100%
    height: 20px
    margin-bottom: 6px

  .current-progress
    width: 100%
    border-radius: 6px

    .v-progress-linear__background,
    .v-progress-linear__determinate
      transition: all 0.5s linear !important

    .current-progress-title
      color: #f1f1f1

      .percent
        display: inline-block
        width: 30px
        padding-left: 5px
</style>
