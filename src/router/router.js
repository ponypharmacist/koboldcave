import Router from 'vue-router'

Vue.use(Router)

let routes = [
  {
    path: '/',
    component: require('~/app').default,
    children: [
      {
        path: 'shenanigans',
        component: require('~/tabs/shenanigans').default,
        name: 'shenanigans'
      },
      {
        path: 'self',
        component: require('~/tabs/self').default,
        name: 'self'
      },
      {
        path: 'shelter',
        component: require('~/tabs/shelter').default,
        name: 'shelter'
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
