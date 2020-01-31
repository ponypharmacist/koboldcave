module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    Vue: true,
    Vuex: true,
    Config: true,
    API: true
  },
  // add your custom rules here
  extends: [
    'plugin:vue/essential',
    '@vue/prettier',
    'plugin:sonarjs/recommended'
  ],
  plugins: ['optimize-regex', 'sonarjs', 'no-loops', 'prettier'],
  rules: {
    'no-console': 0, // process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'sonarjs/no-duplicate-string': 0
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '@': './src',
              '~': './src'
            }
          }
        }
      }
    }
  }
}
