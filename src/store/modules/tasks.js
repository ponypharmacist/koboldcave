/* eslint-disable no-unused-vars */
export default {
  state: {
    activeTask: null,
    tasks: {
      doNothing: {
        title: 'Do Nothing',
        link: null,
        type: 'indefinite',
        tooltipText: 'Just chill.'
      },
      shovelBatshit: {
        title: 'Shovel Bat Shit',
        link: 'shovelBatshit',
        type: 'indefinite',
        effect: [{ resource: 'batshit', amount: 0.4 }],
        cost: [{ resource: 'shrooms', amount: 0.1 }],
        tooltipText: 'Gather that precious guano.'
      },
      contemplateLife: {
        title: 'Contemplate Life',
        link: 'contemplateLife',
        type: 'timed',
        duration: 20,
        progress: 0,
        cost: [{ resource: 'shrooms', amount: 1 }],
        effect: [{ resource: 'insight', amount: 1 }],
        tooltipText: 'Gather that precious guano.'
      }
    }
  },

  getters: {
    tasks(state) {
      return state.tasks
    },

    activeTask(state) {
      return state.activeTask
    },

    activeTaskTitle(state) {
      return state.activeTask ? state.tasks[state.activeTask].title : ''
    },

    activeTaskType(state) {
      return state.tasks[state.activeTask].type
    },

    activeTaskProgress(state) {
      if (state.activeTask && state.tasks[state.activeTask].progress >= 0) {
        return state.tasks[state.activeTask].progress
      } else return
    }
  },

  mutations: {
    toggleTask(state, payload) {
      state.activeTask = state.activeTask == payload ? null : payload
    },

    remember_tasks(state, payload) {
      state.tasks = payload
    },

    modify_tasks(state, item) {
      // item = {
      //  link: String,
      //  attrType: String,
      //  attrIndex: String,
      //  amount: Number
      // }
      const target = state.tasks[item.link][item.attrType][item.attrIndex]
      target.amount = target.amount * item.amount
    },

    setTaskProgress(state, task) {
      // item = {
      //  link: String,
      //  progress: Number
      // }
      state.tasks[task.link].progress = task.progress
    }
  },

  actions: {
    runActiveTask({ state, commit, dispatch, rootGetters }, link) {
      const task = state.tasks[link]

      // Check if the task costs can be paid
      if (task.cost) {
        for (let i = 0; i < task.cost.length; i++) {
          let price = task.cost[i]
          if (rootGetters.resources[price.resource].countRound < price.amount) {
            commit('toggleTask', link)
            return
          }
        }

        dispatch('applyCosts', { category: 'tasks', link: link })
      }

      // Apply task effects
      if (task.type === 'indefinite' && task.effect) {
        dispatch('applyEffects', { category: 'tasks', link: link })
      }

      // Increment progress count
      if (task.type === 'timed') {
        dispatch('incrementTaskProgress', link)
      }
    },

    incrementTaskProgress({ state, commit, dispatch, rootGetters }, link) {
      const task = state.tasks[link]
      let newProgress = Number(Math.round(task.progress + (1 / task.duration / rootGetters.fps) * 100 + 'e2') + 'e-2')

      // Task complete
      if (newProgress >= 100) {
        newProgress = 0
        // apply final task effect
        dispatch('applyEffects', { category: 'tasks', link: link })
        // Check if it unlocks resources
        dispatch('checkEventUnlocksResource', { category: 'tasks', link: link })
        // push log if needed
        // TODO
      }
      // Commit new value for task progress
      commit('setTaskProgress', { link: link, progress: newProgress })
    }
  }
}
