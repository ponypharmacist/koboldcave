// Подключаем все остальные файл
let files = require.context('.', true, /(?!entry).*?.(js|vue)$/)

files.keys().forEach(function(key) {
  return files(key)
})
