<template lang="pug">

.tasks
  v-tooltip(
    v-for="task in tasksUnlocked"
    :key="`task-${task.link}`"
    content-class="button-tooltip"
    right
  )
    template(#activator="tooltip")
      span(v-on="tooltip.on")
        v-btn.task-button(
          @click="toggleTask(task.link)"
          :disabled="checkTasksDisabled(task.link)"
          color="#FFE082"
          :class="{ 'task-active': task.link == activeTask }"
          retain-focus-on-click
          outlined
          small
        ) {{ task.title }}
          v-icon.progress-icon(
            v-if="task.link == activeTask"
            size="14px"
          ) mdi-yin-yang

    tooltip(
      :title="task.title"
      :text="task.tooltipText"
      :type="task.type"
      :effect="task.effect"
      :cost="task.cost ? task.cost : null"
      :flavor="task.tooltipFlavor ? task.tooltipFlavor : null"
    )

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default Vue.component('tasks', {
  name: 'tasks',

  computed: {
    ...mapGetters(['resources', 'tasks', 'tasksUnlocked', 'activeTask'])
  },

  methods: {
    ...mapActions(['toggleTask']),

    checkTasksDisabled(link) {
      const task = this.tasks[link]

      // Check if task effect is maxed
      if ((task.type === 'indefinite' || task.type === 'timed') && task.effect) {
        for (let item of task.effect) {
          if (item.resource && this.resources[item.resource].countRound === this.resources[item.resource].cap) return true
        }
      }
    }
  }
})
</script>

<style lang="sass">
.tasks
  display: flex
  flex-wrap: wrap
  justify-content: flex-start
  align-items: center
  margin-bottom: 6px
</style>
