<template lang="pug">

.shenanigans
  // Actions
  actions

  // Tasks
  tasks

  // Upgrades
  upgrades

  p Traveling merchant here

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
  width: 189px
  max-width: 189px
  margin: 4px 4px

.task-button:hover,
.task-active
  border-width: 2px
</style>
