const { remote } = require('electron')
const fs = require('fs')

// 將瀏覽器需要顯示的資訊儲存到 window 全域變數上
window.versions = {
  node: process.versions.node,
  electron: process.versions.electron,
}

// 取得桌面路徑
const deskTopPath = remote.app.getPath('desktop')

// 將文字儲存成檔案的方法儲存到 window 上
window.writeToFile = text => {
  fs.writeFile(deskTopPath + '/electron.txt', text, console.log)
}
