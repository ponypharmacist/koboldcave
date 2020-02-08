/* eslint-disable no-unused-vars */
export default {
  state: {
    activeTask: 'snooze',
    tasks: {
      snooze: {
        title: 'Snooze',
        link: 'snooze',
        type: 'indefinite',
        unlocked: true,
        tooltipText: 'Just chill out and take a nap.'
      },

      shovelBatshit: {
        title: 'Shovel Bat Shit',
        link: 'shovelBatshit',
        type: 'indefinite',
        unlocked: false,
        trigger: { resource: 'shrooms', amount: 100 },
        effect: [{ resource: 'batshit', amount: 1 }],
        cost: [{ resource: 'shrooms', amount: 0.1 }],
        tooltipText: 'Gather that precious guano.'
      },

      cultivateShrooms: {
        title: 'Cultivate Shrooms',
        link: 'cultivateShrooms',
        type: 'indefinite',
        unlocked: false,
        effect: [{ resource: 'shrooms', amount: 2 }],
        cost: [{ resource: 'batshit', amount: 0.1 }],
        tooltipText: "It's cave farming with fertilizers."
      },

      contemplateLife: {
        title: 'Contemplate Life',
        link: 'contemplateLife',
        type: 'timed',
        unlocked: false,
        duration: 5,
        progress: 0,
        trigger: { resource: 'shrooms', amount: 20 },
        effect: [{ resource: 'insight', amount: 5 }],
        tooltipText: "Maybe there's more to a kobold life than scavenging for shrooms and scraps?",
        unlockMessage: "Something isn't right. There's always a better way to do things."
      },

      contemplateSelf: {
        title: 'Contemplate Self',
        link: 'contemplateSelf',
        type: 'timed',
        unlocked: false,
        blocked: false,
        duration: 5,
        progress: 0,
        trigger: { resource: 'shrooms', amount: 10 },
        // ToDo: place effect.title 'Know Self' in tooltip effects
        effect: [{ unlock: true, category: 'tabs', link: 'self', title: 'Know self' }],
        tooltipText: 'What are you? What is your purpose here?',
        unlockMessage: "Now that food is not a concern, there's time to self-reflect.",
        effectMessage: '⭐ You unlock Self ⭐'
      }
    }
  },

  getters: {
    tasks(state) {
      return state.tasks
    },

    tasksUnlocked(state) {
      let arr = []

      for (let task in state.tasks) {
        if (state.tasks[task].unlocked && !state.tasks[task].blocked) {
          arr.push(state.tasks[task])
        }
      }

      return arr
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
      state.activeTask = state.activeTask === payload ? 'snooze' : payload
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

    unlock_tasks(state, link) {
      state.tasks[link].unlocked = true
    },

    block_tasks(state, link) {
      state.tasks[link].blocked = true
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
    toggleTask({ state, commit, rootGetters }, link) {
      const task = state.tasks[link]

      // Check if task effect is maxed
      if (task.type === 'indefinite' && task.effect) {
        for (let item in task.effect) {
          if (task.effect[item].resource) {
            let resourceName = task.effect[item].resource
            let resource = rootGetters.resources[resourceName]

            if (resource.countRound === resource.cap) return
          }
        }
      }

      commit('toggleTask', link)
    },

    runActiveTask({ state, commit, dispatch, rootGetters }, link) {
      const task = state.tasks[link]

      // Check if task effect is maxed
      for (let item in task.effect) {
        if (task.effect[item].resource) {
          let resourceName = task.effect[item].resource
          let resource = rootGetters.resources[resourceName]

          if (resource.countRound === resource.cap) {
            commit('toggleTask', link)
            return
          }
        }
      }

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
        dispatch('applyEffectsOnce', { category: 'tasks', link: link })

        // Push log if task effect was an unlock of something
        if (task.effect[0].unlock) dispatch('pushLogs', { category: 'tasks', link: link, type: 'effect' })
      }

      // Commit new value for task progress
      commit('setTaskProgress', { link: link, progress: newProgress })
    }
  }
}
