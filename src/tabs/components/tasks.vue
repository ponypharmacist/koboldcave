<template lang="pug">

.tasks
  .section-title Tasks

  v-tooltip(
    v-for="(task, key) in tasks"
    :key="'task_' + key"
    content-class="button-tooltip"
    right
  )
    template(#activator="tooltip")
      v-btn.task-button(
        @click="toggleTask(task.link)"
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
      :type="'task'"
      :effect="task.effect"
      :cost="task.cost ? task.cost : null"
      :flavor="task.tooltipFlavor ? task.tooltipFlavor : null"
    )

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default Vue.component('tasks', {
  name: 'tasks',

  computed: {
    ...mapGetters(['tasks', 'activeTask'])
  },

  methods: {
    ...mapMutations(['toggleTask']),

    actionCheckDisabled(link) {
      if (this.actions[link].cost) {
        for (let i = 0; i < this.actions[link].cost.length; i++) {
          let price = this.actions[link].cost[i]
          if (this.resources[price.resource].countRound < price.amount) {
            return true
          }
        }
      }
      return false
    }
  }
})
</script>

<style lang="sass"></style>
