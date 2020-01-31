<template lang="pug">

.shenanigans
  v-btn.upgrade-button(
    color="#ECEFF1"
    outlined
    small
  ) So: {{ resources.shrooms.count }}
  
  // Actions
  actions

  // Tasks
  tasks

  // Upgrades
  upgrades

  // Producers and consumers
  producers

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'shenanigans',

  computed: {
    ...mapGetters(['resources'])
  },

  methods: {
    ...mapActions(['runUpgrade'])
  }
}
</script>

<style lang="sass">
.shenanigans
  padding: 8px 6px

.section-title
  font-weight: bold
  text-align: center
  padding: 10px 0 0

// Button
.action-button,
.task-button,
.upgrade-button
  width: 184px
  max-width: 184px
  margin: 4px 6px

.task-button:hover,
.task-active
  border-width: 2px

// Button Tooltip
.button-tooltip
  max-width: 300px
  background-color: rgba(0, 0, 0, 1)

// Stuff
@keyframes rotating
  from
    transform: rotate(0deg)
  to
    transform: rotate(360deg)

.progress-icon
  margin-left: 4px
  animation: rotating 2s linear infinite
</style>
