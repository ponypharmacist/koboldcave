const webpack = require('webpack')
const path = require('path')

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'src/index.pug'
    }
  },

  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Vue: 'vue',
        vuetify: 'vuetify',
        _: 'lodash',
        Config: ['config', 'default'],
        API: ['api', 'default']
      })
    ],

    resolve: {
      alias: {
        vue$: 'vue/dist/vue.js',
        '@': path.join(__dirname, '/src/'),
        '~': path.join(__dirname, '/src/'),
        config$: path.join(__dirname, '/app.config.js'),
        api$: path.join(__dirname, '/src/API/entry.js')
      }
    }
  },

  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/styles/settings/variables.sass"
            @import "@/styles/settings/mixins.sass"
          `
      }
    }
  },

  productionSourceMap: false
}
