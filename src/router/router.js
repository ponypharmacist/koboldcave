import Router from 'vue-router'

Vue.use(Router)

let routes = [
  {
    path: '/',
    component: require('~/app').default,
    children: [
      {
        path: 'shenanigans',
        component: require('~/tabs/shenanigans/shenanigans').default,
        name: 'shenanigans'
      },
      {
        path: 'self',
        component: require('~/tabs/self').default,
        name: 'self'
      },
      {
        path: 'skills',
        component: require('~/tabs/skills').default,
        name: 'skills'
      },
      {
        path: 'shelter',
        component: require('~/tabs/shelter/shelter').default,
        name: 'shelter'
      },
      {
        path: 'tribe',
        component: require('~/tabs/tribe').default,
        name: 'tribe'
      },
      {
        path: 'science',
        component: require('~/tabs/science').default,
        name: 'science'
      },
      {
        path: 'shamanism',
        component: require('~/tabs/shamanism').default,
        name: 'shamanism'
      },
      {
        path: 'shrine',
        component: require('~/tabs/shrine').default,
        name: 'shrine'
      },
      {
        path: 'venture',
        component: require('~/tabs/venture').default,
        name: 'venture'
      }
    ]
  },
  {
    path: '*',
    redirect: 'shenanigans'
  }
]

export default new Router({
  mode: 'history',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
