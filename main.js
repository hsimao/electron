// Modules
const { app, BrowserWindow, ipcMain } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    x: 100,
    y: 140,
    webPreferences: { nodeIntegration: true },
    backgroundColor: '#2c92f9',
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools()

  // 主進程載入完畢後等 3 秒後觸發 mailbox 頻道, 送出 email 資訊到瀏覽器端
  mainWindow.webContents.on('did-finish-load', e => {
    console.log('did-finish-load')

    setTimeout(() => {
      mainWindow.webContents.send('mailbox', {
        from: 'Mars',
        email: 'mars@gmail.com',
      })
    }, 3000)
  })

  // Listen for window being closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// 監聽 channel1 頻道, 當瀏覽器端觸發時印出訊息
ipcMain.on('channel1', (e, args) => {
  console.log(args)

  // 回傳訊息到瀏覽器端的 channel1-response 頻道
  e.sender.send('channel1-response', 'Message received on "channel1". Thank you!')
})

// 監聽 closeWindow 頻道, 當瀏覽器端觸發時關閉瀏覽器
ipcMain.on('closeWindow', (e, args) => {
  app.quit()
})

// 監聽 sync-message 頻道
ipcMain.on('sync-message', (e, args) => {
  console.log(args)

  // 等待 3 秒後 return 訊息到瀏覽器端
  setTimeout(() => {
    e.returnValue = 'A sync response from the main process'
  }, 3000)
})

// Electron `app` is ready
app.on('ready', () => {
  console.log('is Ready')
  createWindow()
})

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
