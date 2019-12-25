// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require('electron')

const talkBtn = document.getElementById('talk')
const closeBtn = document.getElementById('close')

let count = 0
setInterval(() => {
  count++
  console.log(count)
}, 1000)

talkBtn.addEventListener('click', e => {
  // 在瀏覽器端發送訊息到主進程 channel1 頻道
  // ipcRenderer.send('channel1', 'Hello from main window')

  // 同步事件, 使用 sendSync 等待主進程回傳資料後程式才會接續執行
  const res = ipcRenderer.sendSync('sync-message', 'Waiting for response')
  console.log(res)
})

closeBtn.addEventListener('click', e => {
  //在瀏覽器端觸發主進程 closeWindow 頻道
  ipcRenderer.send('closeWindow')
})

ipcRenderer.on('channel1-response', (e, args) => {
  // 接收從主進程 channel1-respons 頻道回傳的訊息
  console.log(args)
})

// 監聽主進程 mailbox 頻道
ipcRenderer.on('mailbox', (e, args) => {
  console.log(args)
})
