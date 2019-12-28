// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const remote = require('electron').remote
const { app, dialog, BrowserWindow } = remote

const button = document.getElementById('test-button')
const quitBtn = document.getElementById('quit-button')
const dialogBtn = document.getElementById('dialog-button')
const windowBtn = document.getElementById('window-button')
const fullBtn = document.getElementById('full-button')

// 取得主進程 global 變數值
button.addEventListener('click', e => {
  console.log(remote.getGlobal('myglob'))
  alert(remote.getGlobal('myglob'))
})

// 透過 remote 調用 創建視窗功能
windowBtn.addEventListener('click', () => {
  let secWin = new BrowserWindow({
    width: 400,
    height: 350,
  })
  secWin.loadFile('index.html')
})

// 透過 remote 調用 dialog 彈窗功能
dialogBtn.addEventListener('click', () => {
  dialog.showMessageBox({ message: '從瀏覽器端透過 remote 調用主進程 Dialog API' })
})

// 透過 remote 取得的 app, 調用 app.quit 關閉應用
quitBtn.addEventListener('click', () => {
  app.quit()
})

// 取得當前視窗, 並將視窗設定滿版
fullBtn.addEventListener('click', () => {
  remote.getCurrentWindow().maximize()
})
