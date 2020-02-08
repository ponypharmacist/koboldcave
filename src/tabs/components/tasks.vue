<template lang="pug">

.tasks(:class="{ 'justify-center': tasksUnlocked.length <=3 }")
  v-tooltip(
    v-for="task in tasksUnlocked"
    :key="`task-${task.link}`"
    content-class="button-tooltip"
    right
  )
    template(#activator="tooltip")
      v-btn.task-button(
        @click="toggleTask(task.link)"
        :disabled="checkTasksDisabled(task.link)"
        v-on="tooltip.on"
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
        for (let item in task.effect) {
          if (task.effect[item].resource) {
            let resourceName = task.effect[item].resource
            let resource = this.resources[resourceName]

            if (resource.countRound === resource.cap) return true
          }
        }
      }
    }
  }
})
</script>

<style lang="sass">
.tasks
  display: flex
  justify-content: flex-start
  align-items: center
  margin-bottom: 6px
</style>
