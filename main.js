// Modules
const { app, BrowserWindow, session } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  let ses = session.defaultSession

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: { nodeIntegration: true },
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools()

  // 監聽下載事件
  ses.on('will-download', (e, downloadItem, webContents) => {
    const fileName = downloadItem.getFilename()
    let fileSize = downloadItem.getTotalBytes()

    // 將檔案下載到桌面
    downloadItem.setSavePath(app.getPath('desktop') + `/${fileName}`)

    downloadItem.on('updated', (e, state) => {
      // 已下載大小
      let received = downloadItem.getReceivedBytes()
      console.log('received', received)

      if (state === 'progressing' && received) {
        // 計算下載進度
        let progress = Math.round((received / fileSize) * 100)
        console.log('progress', progress)
        webContents.executeJavaScript(`window.progress.value = ${progress}`)
      }
    })
  })

  // Listen for window being closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 關閉應用程式事件監聽
app.on('before-quit', e => {
  console.log('before-quit')
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
