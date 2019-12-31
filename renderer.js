// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { remote } = require('electron')

// 取得當前瀏覽器
const self = remote.getCurrentWindow()

let progress = 0.01

// 動態進度條, 每 100 毫秒增加 0.01 進度
// 跑到 1 時中止 setInterval
const progressInterval = setInterval(() => {
  self.setProgressBar(progress)
  if (progress <= 1) {
    progress += 0.01
  } else {
    self.setProgressBar(-1)
    clearInterval(progressInterval)
  }
}, 10)
