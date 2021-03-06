/* eslint-disable sonarjs/cognitive-complexity */
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
        effect: [
          { bars: 'motivation', amount: 0.05 },
          { bars: 'flux', amount: 0.05 }
        ],
        tooltipText: 'Just chill out and take a nap.'
      },

      shovelBatshit: {
        title: 'Shovel Bat Shit',
        link: 'shovelBatshit',
        type: 'indefinite',
        unlocked: false,
        trigger: { resource: 'shrooms', amount: 50 },
        effect: [{ resource: 'batshit', amount: 1 }],
        cost: [{ resource: 'shrooms', amount: 0.1 }],
        tooltipText: 'Gather that precious guano.',
        unlockMessage: 'Task available: Shovel Bat Shit.'
      },

      cultivateShrooms: {
        title: 'Cultivate Shrooms',
        link: 'cultivateShrooms',
        type: 'indefinite',
        unlocked: false,
        trigger: { resource: 'batshit', amount: 10 },
        effect: [{ resource: 'shrooms', amount: 2 }],
        cost: [{ resource: 'batshit', amount: 0.1 }],
        tooltipText: "It's cave farming with fertilizers.",
        unlockMessage: 'Task available: Cultivate Shrooms.'
      },

      milkSpiders: {
        title: 'Milk Spiders',
        link: 'milkSpiders',
        type: 'timed',
        unlocked: false,
        duration: 5,
        progress: 0,
        effect: [
          { resource: 'spiderstring', amount: 1 },
          { skills: 'farming', progress: 1 }
        ],
        cost: [{ bars: 'motivation', amount: 3 }],
        tooltipText: 'Be gentle, spiders love it.',
        unlockMessage: 'Task available: <b class="highlight">Milk Spiders</b>.'
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
        effect: [{ unlock: true, category: 'tabs', link: 'self', title: 'Know self' }],
        tooltipText: 'What are you? What is your purpose here?',
        unlockMessage: "Now that food is not a concern, there's time to <b class='highlight'>self-reflect</b>.",
        effectMessage: '⭐ You unlock Self ⭐'
      }
    }
  },

  getters: {
    tasks(state) {
      return state.tasks
    },

    tasksUnlocked(state) {
      return Object.values(state.tasks).filter((task) => task.unlocked && !task.blocked)
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
      state.activeTask = payload
    },

    remember_tasks(state, payload) {
      state.tasks = payload
    },

    modify_tasks(state, item) {
      // item = {
      // link: String,
      // attrType: String,
      // attrIndex: attrIndex,
      // amount: Number
      // }
      if (item.attrIndex >= 0) state.tasks[item.link][item.attrType][item.attrIndex].amount = item.amount
      else state.tasks[item.link][item.attrType] = item.amount
    },

    unlock_tasks(state, unlock) {
      state.tasks[unlock.link].unlocked = true
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
    toggleTask({ state, commit, dispatch, rootGetters }, link) {
      if (state.activeTask === link || link === 'snooze') {
        commit('toggleTask', 'snooze')
      } else {
        const task = state.tasks[link]
        commit('toggleTask', link)
      }
    },

    runActiveTask({ state, dispatch, rootGetters }, link) {
      const task = state.tasks[link]

      // Check if task effect is maxed
      for (let item of task.effect) {
        if (item.resource && rootGetters.resources[item.resource].countRound === rootGetters.resources[item.resource].cap) {
          dispatch('toggleTask', link)
          return
        }
      }
      // Check if the task costs can be paid
      if (task.type === 'indefinite' && task.cost) {
        for (let item of task.cost) {
          if (
            (item.resource && rootGetters.resources[item.resource].countRound < item.amount) ||
            (item.bars && rootGetters.bars[item.bars].value < item.amount)
          ) {
            dispatch('toggleTask', link)
            return
          }
        }
        dispatch('applyCosts', { category: 'tasks', link: link })
      }
      // 1. Indefinite tasks
      if (task.type === 'indefinite') dispatch('applyEffects', { category: 'tasks', link: link })
      // 2. Timed tasks
      if (task.type === 'timed') dispatch('incrementTaskProgress', link)
    },

    incrementTaskProgress({ state, commit, dispatch, rootGetters }, link) {
      const task = state.tasks[link]
      let newProgress = Number(Math.round(task.progress + (1 / task.duration / rootGetters.fps) * 100 + 'e2') + 'e-2')
      // Check if the task costs can be paid
      if (task.progress === 0 && task.cost) {
        for (let item of task.cost) {
          if (
            (item.resource && rootGetters.resources[item.resource].countRound < item.amount) ||
            (item.bars && rootGetters.bars[item.bars].value < item.amount)
          ) {
            dispatch('toggleTask', link)
            return
          }
        }
        dispatch('applyCostsOnce', { category: 'tasks', link: link })
      }

      // Task complete
      if (newProgress >= 100) {
        newProgress = 0
        // apply final task effect
        dispatch('applyEffectsOnce', { category: 'tasks', link: link })

        // If task effect is an unlock of something
        if (task.effect[0].unlock) {
          commit('block_tasks', link) // lock source task
          commit('toggleTask', 'snooze')
          dispatch('pushLogs', { category: 'tasks', link: link, type: 'effect' })
        }
      }

      // Commit new value for task progress
      commit('setTaskProgress', { link: link, progress: newProgress })
    }
  }
}
