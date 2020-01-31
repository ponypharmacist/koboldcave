import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdiSvg' // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
  },
  theme: {
    themes: {
      light: {
        // primary: '#3f51b5',
        // secondary: '#2196f3',
        // accent: '#e91e63',
        // error: '#f44336',
        // warning: '#ff5722',
        // info: '#00bcd4',
        // success: '#4caf50'
      }
    }
  }
})

export default vuetify
