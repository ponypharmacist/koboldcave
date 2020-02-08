import './styles/main.sass'
import './config'

import { sync } from 'vuex-router-sync'
import router from './router/router'
import store from './store/store'
import vuetify from './plugins/vuetify'

sync(store, router)

new Vue({
  router,
  vuetify,
  store
}).$mount('#cave')
