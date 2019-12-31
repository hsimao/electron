// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const electron = require('electron')

// console.log(electron.screen)
console.log(electron.screen.getAllDisplays())

const display = electron.screen.getAllDisplays()

// 取得瀏覽器寬、高
console.log(`${display[0].size.width} x ${display[0].size.height}`)

// 取得瀏覽器 x、y 軸座標
console.log(`${display[0].bounds.x} x ${display[0].bounds.y}`)

// 監聽螢幕配置更改
electron.screen.on('display-metrics-changed', (e, display, metricsChanged) => {
  console.log(metricsChanged)
})

document.getElementsByTagName('body')[0].addEventListener('click', e => {
  // 取得當前螢幕點擊座標
  console.log(electron.screen.getCursorScreenPoint())
})
